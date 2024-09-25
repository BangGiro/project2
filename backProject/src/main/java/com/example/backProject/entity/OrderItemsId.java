package com.example.backProject.entity;

import java.io.Serializable;
import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemsId implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private int orderId;
	private String productId;
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemsId that = (OrderItemsId) o;
        return orderId == that.orderId && Objects.equals(productId, that.productId);
    }

    // hashCode 메서드 구현
    @Override
    public int hashCode() {
        return Objects.hash(orderId, productId);
    }
}
