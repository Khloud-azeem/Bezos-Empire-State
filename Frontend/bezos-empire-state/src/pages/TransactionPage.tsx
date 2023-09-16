import { useEffect, useState } from "react";
import transactionService, {
  Transaction,
} from "../services/transaction-service";
import { CanceledError } from "../services/api-client";
import TransactionTable from "../components/TransactionTable/TransactionTable";
import Cards from "../components/Cards";

interface TransactionByMerchant {
  [key: string]: Transaction[];
}

export interface Merchant {
  [key: string]: { totalAmount: number };
}
const TransactionPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [transactionsByMerchant, setTransactionsByMerchant] =
    useState<TransactionByMerchant>({});

  const [bezosCompanies, setBezosCompanies] = useState<Merchant>({});

  const [totalTransactionsAmount, setTotalTransactionsAmount] = useState(0);
  const [_error, setError] = useState("");
  const [isLoading, setIsloading] = useState(true);

  const handleBezosMark = (merchantName: string) => {
    let totalAmount = 0;
    const copyBezosCompanies = { ...bezosCompanies };
    if (bezosCompanies[merchantName]) {
      delete copyBezosCompanies[merchantName];
      setBezosCompanies(copyBezosCompanies);
      transactionService.deleteMerchant({ merchant: { name: merchantName } });
      return;
    }
    transactionsByMerchant[merchantName].forEach((transaction) => {
      totalAmount += transaction.amount;
    });
    setBezosCompanies({ ...bezosCompanies, [merchantName]: { totalAmount } });
    transactionService.addMerchant({
      merchant: { name: merchantName, total_amount: totalAmount },
    });
  };
  console.log("hello, ", bezosCompanies);
  useEffect(() => {
    setIsloading(true);
    const { request, cancel } = transactionService.getAllTransactions();

    const tempBezosComapnies: Merchant = {};
    transactionService
      .getAllMerchants()
      .then((res) => {
        console.log("data merchants ", res.data);
        res.data.forEach((merchant) => {
          tempBezosComapnies[merchant.name] = {
            totalAmount: merchant.total_amount,
          };
        });
        console.log(tempBezosComapnies);
        setBezosCompanies(tempBezosComapnies);
      })
      .catch((err) => console.log(err.message));
    request
      .then((res) => {
        const data = res.data;
        const dataByMerchant: TransactionByMerchant = {};
        let tempTotalAmount = 0;

        data.forEach((transaction) => {
          tempTotalAmount += transaction.amount;
          if (dataByMerchant[transaction.merchant_name]) {
            dataByMerchant[transaction.merchant_name].push(transaction);
          } else {
            dataByMerchant[transaction.merchant_name] = [transaction];
          }
        });

        setTotalTransactionsAmount(tempTotalAmount);
        setTransactionsByMerchant(dataByMerchant);
        setTransactions(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.message);
        setError(err.message);
        setIsloading(false);
      });
    return () => {
      cancel();
    };
  }, []);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (<>
        <Cards
          companies={bezosCompanies}
          totalTransactionsAmount={totalTransactionsAmount}
        />
        <TransactionTable
          onMark={handleBezosMark}
          bezos={bezosCompanies}
          transactions={transactions}
        />
      </>
      )}
    </>
  );
};

export default TransactionPage;
