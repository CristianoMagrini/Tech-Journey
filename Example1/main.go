package main

import (
	"fmt"
	"math"
)

type geometry interface {
	area() float64
}

type circle struct {
	radius float64
}

func (c circle) area() float64 {
	return math.Pi * c.radius * c.radius
}

func (c circle) perim() float64 {
	return 2 * math.Pi * c.radius
}

func measure(g geometry) {
	fmt.Println(g)
	fmt.Printf("%.2f\n", g.area())
}

func main() {
	c := circle{radius: 5.0}
	measure(c)

	fmt.Printf("%.2f", c.perim())
}
