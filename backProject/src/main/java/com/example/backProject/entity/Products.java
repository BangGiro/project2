package com.example.backProject.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Products {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int productId;

	private String productName;
	private String description;
	private double price;
	private int stockQuantity;
	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private Categories category; // categoryId 대신 Categories 객체 사용
	private String brand;
	private double weight;
	private double shippingCost;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	@PrePersist
	protected void onCreate() {
		this.createdAt = LocalDateTime.now();
		this.updatedAt = LocalDateTime.now();
	}
	
	@PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}
