package application.service;

import application.model.Order;
import application.model.Receipt;
import org.springframework.stereotype.Service;

@Service
public class ReceiptServiceImpl implements ReceiptService{
    @Override
    public Receipt getReceiptForOrder(Order order) {
        return new Receipt(order);
    }
}
