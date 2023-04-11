import { Table, Text, User } from "@nextui-org/react";
import styles from "./IndexTable.module.css";

const IndexTable = ({ data, title }: any) => {
  const columns = [
    { key: "name", label: "Index" },
    { key: "value", label: "Value" },
    { key: "netChange", label: "Net Change" },
    { key: "percentCh", label: "% Change" },
    { key: "1month", label: "1 Month" },
    { key: "1year", label: "1 Year" },
    { key: "timeEDT", label: "Time (EDT)" },
  ];

  function renderCell(item, columnKey) {
    switch (columnKey) {
      case "name": {
        return (
          <User src={null} name={item.Name.ticker}>
            {item.Name.full}
          </User>
        );
      }

      case "value":
        return <Text>{item.Value}</Text>;
      case "netChange":
        return <Text>{item["Net Change"]}</Text>;
      case "percentCh":
        return <Text>{item["% Change"]}</Text>;
      case "1month":
        return <Text>{item["1 Month"]}</Text>;
      case "1year":
        return <Text>{item["1 Year"]}</Text>;
      case "timeEDT":
        return <Text>{item["Time (EDT)"]}</Text>;
    }
  }

  return (
    <Table
      aria-label={title}
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="single"
      className={styles.table}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={data}>
        {(item) => {
          return (
            <Table.Row key={item["Name"].abbrev}>
              {(columnKey) => (
                <Table.Cell>{data && renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          );
        }}
      </Table.Body>
    </Table>
  );
};
export default IndexTable;
