insert INTO Orders(User_id, Cart_id, order_status)
Values
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 3);


insert INTO Carts(Order_id, Product_id, Quantity, Price)
Values
(1, 1, 4, 45),
(2, 2, 7, 20),
(3, 3, 3, 11),
(4, 4, 4, 19);

SELECT * FROM Carts, Users
Limit 4;
