import TransactionCard from "./Card";
import { Grid } from "@mui/material";
import { Merchant } from "../pages/TransactionPage";

interface Props {
  companies: Merchant;
  totalTransactionsAmount: number;
}
const Cards = ({ companies, totalTransactionsAmount }: Props) => {
  let totalAmount = 0;
  let percentage = 0;
  let bezos = Object.keys(companies).join(",");
  const keys = Object.keys(companies);

  if (keys.length > 0) {
    keys.forEach((key) => {
      totalAmount += companies[key].totalAmount;
    });
    if (totalTransactionsAmount != 0) {
      percentage =
        parseFloat((totalAmount / totalTransactionsAmount).toFixed(2)) * 100;
    }
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TransactionCard title="Bezos Comapanies" value={bezos} />
      </Grid>
      <Grid item xs={3}>
        <TransactionCard
          title="Total Amount"
          value={"$" + totalAmount.toFixed(2)}
        />
      </Grid>
      <Grid item xs={3}>
        <TransactionCard title="Percentage" value={percentage + "%"} />
      </Grid>
    </Grid>
  );
};

export default Cards;
