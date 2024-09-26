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
	
	private Orders order;
	private Products product;
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemsId that = (OrderItemsId) o;
        return  Objects.equals(order, that.order) && Objects.equals(product, that.product);
    }

    // hashCode 메서드 구현
    @Override
    public int hashCode() {
        return Objects.hash(order, product);
    }
}
