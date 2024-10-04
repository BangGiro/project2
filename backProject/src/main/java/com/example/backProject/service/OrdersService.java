package com.example.backProject.service;

import java.util.List;

import com.example.backProject.domain.OrdersDTO;
import com.example.backProject.entity.Orders;

public interface OrdersService {
    OrdersDTO createOrder(OrdersDTO ordersDTO);
    public List<Orders> findOrdersByUserId(String userId); 
    public void deleteOrderById(int orderId);
}
