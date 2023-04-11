import {
  getTextArea,
  getFooter,
  getRootElement,
  getSubmitButton,
  getWebChatGPTToolbar,
} from "../utils/finder";

import { SearchRequest, SearchResult, webSearch } from "../utils/ddg";

import { apiExtractText } from "../utils/extract";

const userConfig = { webAccess: true };

let isProcessing = false;

let btnSubmit: HTMLButtonElement;
let textarea: HTMLTextAreaElement;
let footer: HTMLDivElement;

async function processQuery(query: string) {
  let results: SearchResult[];

  const pageCommandMatch = query.match(/page:(\S+)/);
  if (pageCommandMatch) {
    const url = pageCommandMatch[1];
    results = await apiExtractText(url);
  } else {
    const searchRequest: any = {
      query,
    };

    results = await webSearch(searchRequest, 1);
  }

  return results;
}

async function handleSubmit(query: string) {
  if (!userConfig.webAccess) {
    textarea.value = query;
    pressEnter();
    return;
  }

  try {
    const results = await processQuery(query);
    // console.info("WebChatGPT results --> ", results)
    const compiledPrompt = results;
    // console.info("WebChatGPT compiledPrompt --> ", compiledPrompt)

    pressEnter();
  } catch (error) {
    if (error instanceof Error) {
      showErrorMessage(error);
    }
  }
}

async function onSubmit(event: MouseEvent | KeyboardEvent) {
  const isKeyEvent = event instanceof KeyboardEvent;

  if (isKeyEvent && event.shiftKey && event.key === "Enter") return;

  if (isKeyEvent && event.key === "Enter" && event.isComposing) return;

  if (
    !isProcessing &&
    (event.type === "click" || (isKeyEvent && event.key === "Enter"))
  ) {
    const query = textarea.value.trim();

    if (query === "") return;

    textarea.value = "";

    isProcessing = true;
    await handleSubmit(query);
    isProcessing = false;
  }
}

function pressEnter() {
  textarea.focus();
  const enterEvent = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key: "Enter",
    code: "Enter",
  });
  textarea.dispatchEvent(enterEvent);
}

function showErrorMessage(error: Error) {
  console.info("WebChatGPT error --> API error: ", error);
  const div = document.createElement("div");
  document.body.appendChild(div);
}

async function updateUI() {
  if (getWebChatGPTToolbar()) return;

  btnSubmit = getSubmitButton();
  textarea = getTextArea();
  footer = getFooter();

  if (textarea && btnSubmit) {
    textarea.addEventListener("keydown", onSubmit);
    btnSubmit.addEventListener("click", onSubmit);

    const textareaParentParent = textarea.parentElement?.parentElement;
    if (textareaParentParent && textareaParentParent.parentElement) {
      textareaParentParent.style.flexDirection = "column";
      textareaParentParent.parentElement.style.flexDirection = "column";
      textareaParentParent.parentElement.style.gap = "0px";
      textareaParentParent.parentElement.style.marginBottom = "0.5em";
    }
  }

  if (footer) {
    const lastChild = footer.lastElementChild as HTMLElement;
    if (lastChild) lastChild.style.padding = "0 0 0.5em 0";
  }
}

const rootEl = getRootElement();
window.onload = function () {
  updateUI();

  try {
    new MutationObserver(() => {
      updateUI();
    }).observe(rootEl, { childList: true });
  } catch (e) {
    if (e instanceof Error) {
      showErrorMessage(e);
    }
  }
};
