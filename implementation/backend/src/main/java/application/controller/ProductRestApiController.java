package application.controller;

import application.model.Product;
import application.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductRestApiController {

    private final ProductService productService;

    @Autowired
    public ProductRestApiController(ProductService productService) {
        this.productService = productService;
    }

    @RequestMapping(value = "/product/", method = RequestMethod.GET)
    public ResponseEntity<?> listAllProducts() {
        List<Product> products = this.productService.findAll();

        if (products.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value = "/product/id={id}", method = RequestMethod.GET)
    public ResponseEntity<?> getProduct(@PathVariable("id") int id) {
        Product product = this.productService.findById(id);

        if (product == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value = "/product/", method = RequestMethod.POST)
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        Product newProduct;

        newProduct = this.productService.saveProduct(product);

        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value = "/product/id={id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateProduct(@PathVariable("id") int id, @RequestBody Product product) {
        Product currentProduct = this.productService.findById(id);

        if (currentProduct == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        currentProduct = this.productService.updateProduct(product);

        return new ResponseEntity<>(currentProduct, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value = "/product/id={id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteProduct(@PathVariable("id") int id) {
        Product product = this.productService.findById(id);

        if (product == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        this.productService.deleteProductById(id);
        return new ResponseEntity<>(product,HttpStatus.OK);
    }
}
