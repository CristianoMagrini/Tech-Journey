package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type order struct {
	Amount     float64 `json:"amount" binding:"required,gte=0.0"`
	CustomerId int     `json:"customer_id"`
	Date       string  `json:"date" binding:"required"`
}

func CreateOrderForCustomer(c *gin.Context) {
	customer_id, err := strconv.Atoi(c.Param("customer-id"))
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}
	var order order
	if err := c.ShouldBind(&order); err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}
	order.CustomerId = customer_id
	c.IndentedJSON(http.StatusOK, order)
}

func main() {
	gin.SetMode(gin.DebugMode)
	r := gin.Default()

	r.POST("/customers/:customer-id/orders", CreateOrderForCustomer)

	if err := r.Run(":8089"); err != nil {
		panic(err)
	}
}
