import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Donation } from "@/lib/types/Donations"
import Link from "next/link"
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  
  export function DonationTable({donations}:{donations:Donation[]}) {
    return (
      <Table>
        <TableCaption>A list of your recent Donations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Trnx ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Post ID</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        {donations && donations.length > 0 ?
        <>
        <TableBody>
          {donations.map((tranx) => (
            <TableRow key={tranx.id + tranx.payment}>
              <TableCell className="font-medium">{tranx.id}</TableCell>
              <TableCell>{tranx.createdAt.slice(0,10)}</TableCell>
              <TableCell>{tranx.payment}</TableCell>
              <TableCell><Link href={`/browse-a-campaign/${tranx.postId}`}>{tranx.postId}</Link></TableCell>
              <TableCell className="text-right">{tranx.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
        </>
          :
          <TableBody>
          
            <TableRow key={"nodata"}>
              <TableCell colSpan={5} className="font-medium text-center">{"Seems like you haven't Donated to any Camapigns"}</TableCell>
            </TableRow>
      
        </TableBody>
        }
      </Table>
    )
  }
  