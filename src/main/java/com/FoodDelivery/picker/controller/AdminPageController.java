package com.FoodDelivery.picker.controller;



import jakarta.servlet.http.HttpSession;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.nio.file.Files;

@Controller
public class AdminPageController {

    @GetMapping("/admin")
    @ResponseBody
    public byte[] adminPage(HttpSession session) throws IOException {

        Boolean loggedIn =
                (Boolean) session.getAttribute("ADMIN_LOGGED_IN");

        // If not logged in → show login page
        if (loggedIn == null || !loggedIn) {
            ClassPathResource login =
                    new ClassPathResource("admin-ui/admin-login.html");
            return Files.readAllBytes(login.getFile().toPath());
        }

        // If logged in → show admin page
        ClassPathResource admin =
                new ClassPathResource("admin-ui/admin.html");
        return Files.readAllBytes(admin.getFile().toPath());
    }
}
