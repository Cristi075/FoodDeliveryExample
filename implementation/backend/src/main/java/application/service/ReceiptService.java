package application.service;

import application.model.Order;
import application.model.Receipt;
import org.springframework.stereotype.Service;

@Service
public interface ReceiptService {
    Receipt getReceiptForOrder(Order order);
}
