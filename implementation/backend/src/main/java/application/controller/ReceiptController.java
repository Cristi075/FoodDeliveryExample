package application.controller;

import application.model.Order;
import application.model.Receipt;
import application.service.OrderService;
import application.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ReceiptController {
    private final ReceiptService receiptService;
    private final OrderService orderService;

    @Autowired
    public ReceiptController(ReceiptService receiptService, OrderService orderService) {
        this.receiptService = receiptService;
        this.orderService = orderService;
    }

    @RequestMapping(value = "/receipt/orderId={id}", method = RequestMethod.GET)
    public ResponseEntity<?> getReceipt(@PathVariable("id") int id){
        Order order = this.orderService.findById(id);

        Receipt receipt = this.receiptService.getReceiptForOrder(order);

        return ResponseEntity
                .ok()
                .contentType(MediaType.parseMediaType("application/pdf"))
                .body(new InputStreamResource(receipt.getStream()));
    }
}
