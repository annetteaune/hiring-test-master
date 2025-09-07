import { Button, Icon } from "@oliasoft-open-source/react-ui-library";

const SortControls = ({ sortOrder, className }) => (
  <div className={className}>
    <Button
      label={<Icon icon="sort ascending" />}
      onClick={() => sortOrder("asc")}
    />
    <Button
      label={<Icon icon="sort descending" />}
      onClick={() => sortOrder("desc")}
    />
    <Button label={<Icon icon="undo" />} onClick={() => sortOrder("none")} />
  </div>
);

export default SortControls;
