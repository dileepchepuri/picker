package com.FoodDelivery.picker.PageController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String userHome() {
        return "forward:/user/index.html";
    }

//    @GetMapping("/aadmin")
//    public String adminHome() {
//        return "forward:/admin/admin.html";
//    }
}
