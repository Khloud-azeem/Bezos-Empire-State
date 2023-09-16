import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  value: any;
}

function TransactionCard({ title, value }: Props) {
  return (
    <Card sx={{ mb: 1.5 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TransactionCard;
