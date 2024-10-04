package com.example.backProject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "exercises_images")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int image_id;

    private String name;
    private String category;
    private String image;
}

