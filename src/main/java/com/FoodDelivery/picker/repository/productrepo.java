package com.FoodDelivery.picker.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.FoodDelivery.picker.Model.Products;


public interface productrepo extends JpaRepository<Products, Integer> {
}
