package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleHealthCheck(c *gin.Context) {
	c.String(http.StatusOK, fmt.Sprintln("the system is health"))
}

func main() {
	gin.SetMode(gin.DebugMode)
	r := gin.Default()

	r.GET("/example", func(c *gin.Context) {
		c.String(http.StatusOK, fmt.Sprintln("this is a demo endpoint"))
	})
	r.GET("/health", HandleHealthCheck)

	err := r.Run(":8089")
	if err != nil {
		panic(err)
	}
}
