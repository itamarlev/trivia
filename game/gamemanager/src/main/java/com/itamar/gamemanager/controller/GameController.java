package com.itamar.gamemanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/game")
public class GameController
{
	@GetMapping("/hello")
	public String seyHello(){
		return "hello world";
	}

}
