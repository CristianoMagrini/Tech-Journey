package main

import "fmt"

type animal interface {
	makeSound() string
}

type dog struct{}

func (d dog) makeSound() string {
	return "Woof!"
}

type ball struct{}

func (b ball) bounce() string {
	return "Boom!"
}

func main() {
	var a1 interface{}
	a1 = dog{}
	d1 := a1.(dog)
	fmt.Println("d1:", d1.makeSound())

	a1 = ball{}
	b1, ok := a1.(animal)
	if !ok {
		fmt.Println("ball is not an animal")
	}
	fmt.Println("b1:", b1)

	a1 = ball{}
	b2 := a1.(ball)
	fmt.Println("b2:", b2.bounce())
}
