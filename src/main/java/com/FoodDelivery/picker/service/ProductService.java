package com.FoodDelivery.picker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.FoodDelivery.picker.Model.Products;
import com.FoodDelivery.picker.repository.productrepo;



@Service
public class ProductService {

    private final productrepo repo;

    public ProductService(productrepo repo) {
        this.repo = repo;
    }

    public List<Products> getAllProducts() {
        return repo.findAll();
    }

    public Products addProduct(Products product) {
        return repo.save(product);
    }

    public Products updateProduct(int id, Products product) {
        Products existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setName(product.getName());
        existing.setPrice(product.getPrice());
        existing.setCategory(product.getCategory());
        existing.setImage(product.getImage());

        return repo.save(existing);
    }

    public void deleteProduct(int id) {
        repo.deleteById(id);
    }
}
