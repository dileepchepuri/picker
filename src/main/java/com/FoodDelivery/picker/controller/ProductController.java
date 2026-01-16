package com.FoodDelivery.picker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.FoodDelivery.picker.Model.Products;
import com.FoodDelivery.picker.service.ProductService;

import jakarta.servlet.http.HttpSession;




@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // ==========================
    // USER + ADMIN (READ)
    // ==========================
    @GetMapping
    public List<Products> getProducts() {
        return service.getAllProducts();
    }

    // ==========================
    // ADMIN ONLY (CREATE)
    // ==========================
    @PostMapping
    public Products addProduct(@RequestBody Products product,
                               HttpSession session) {

        validateAdmin(session);
        return service.addProduct(product);
    }

    // ==========================
    // ADMIN ONLY (UPDATE)
    // ==========================
    @PutMapping("/{id}")
    public Products updateProduct(@PathVariable int id,
                                  @RequestBody Products product,
                                  HttpSession session) {

        validateAdmin(session);
        return service.updateProduct(id, product);
    }

    // ==========================
    // ADMIN ONLY (DELETE)
    // ==========================
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id,
                              HttpSession session) {

        validateAdmin(session);
        service.deleteProduct(id);
    }

    // ==========================
    // ADMIN VALIDATION
    // ==========================
    private void validateAdmin(HttpSession session) {
        Object admin = session.getAttribute("ADMIN_LOGGED_IN");

        if (admin == null || !(Boolean) admin) {
            throw new RuntimeException("Unauthorized access");
        }
    }
}


