package com.FoodDelivery.picker.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;

@Controller
public class AdminAuthController {

    @GetMapping("/admin-login")
    @ResponseBody
    public byte[] loginPage() throws IOException {
        ClassPathResource resource =
                new ClassPathResource("admin-ui/admin-login.html");

        return Files.readAllBytes(resource.getFile().toPath());
    }

    @PostMapping("/admin-login")
    public String login(@RequestParam String password,
                        HttpSession session) {

        if ("admin123".equals(password)) {
            session.setAttribute("ADMIN_LOGGED_IN", true);
            return "redirect:/admin";
        }

        return "redirect:/admin-login";
    }

    @GetMapping("/admin-logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/admin-login";
    }
}

