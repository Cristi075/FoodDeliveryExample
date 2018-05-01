package application.model;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Date;

public class Receipt {
    private Order order;

    public Receipt(Order order){
        this.order = order;
    }

    public InputStream getStream(){
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        Document document = new Document();

        try{
            PdfWriter.getInstance(document, stream);
            document.open();

            document.add(new Paragraph("Order nr." + order.getId()));
            String client = order.getOwner().getFullName() + " (" + order.getOwner().getUsername() + ")";
            document.add(new Paragraph("Client: " + client));
            document.add(new Paragraph("Address: " + order.getAddress().toString()));

            document.add(this.generateTable());

            long totalPrice = 0;
            for(ProductOrder productOrder: this.order.getProductOrders()) {
                totalPrice += productOrder.getQuantity() * productOrder.getProduct().getPrice();
            }
            document.add(new Paragraph("Total price: " + String.valueOf(totalPrice)));

            Date date = new Date(System.currentTimeMillis());
            document.add(new Paragraph("Generated at "+date.toString()));

            document.close();
        } catch (DocumentException e) {
            System.out.println(e.getMessage());
        }

        return new ByteArrayInputStream(stream.toByteArray());
    }

    private PdfPTable generateTable(){
        PdfPTable table = new PdfPTable(4);

        table.setSpacingBefore(15);
        table.addCell("Product");
        table.addCell("Unit price");
        table.addCell("Quantity");
        table.addCell("Price");

        for(ProductOrder productOrder: this.order.getProductOrders()){
            table.addCell(String.valueOf(productOrder.getProduct().getName()));
            table.addCell(String.valueOf(productOrder.getProduct().getPrice()) + "RON");
            table.addCell(String.valueOf(productOrder.getQuantity()));
            table.addCell(String.valueOf(productOrder.getProduct().getPrice() * productOrder.getQuantity()) + "RON");
        }

        return table;
    }
}
