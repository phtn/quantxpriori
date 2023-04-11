type InitialPropTypes = {
  input: string;
  callback: React.Dispatch<React.SetStateAction<string>>;
};

export default async ({ input, callback }: InitialPropTypes) => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      );
    }

    callback(data.result);
    // setInput("");
  } catch (error) {
    // Consider implementing your own error handling logic here
    console.error(error);
    alert(error.message);
  }
};
