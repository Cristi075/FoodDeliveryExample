package application.service;

import application.model.Product;

import java.util.List;

public interface ProductService {

    Product findById(int id);

    List<Product> findAll();

    Product saveProduct(Product product);

    Product updateProduct(Product product);

    void deleteProductById(int id);

}
