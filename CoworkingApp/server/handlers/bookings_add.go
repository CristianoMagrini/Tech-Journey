package handlers

import (
	"coworkingapp/models"
	"coworkingapp/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type BookingDTO struct {
	RoomId   string `json:"room_id" binding:"required"`
	BookedOn string `json:"booked_on" binding:"required"`
}

func mapBookingDtoToModel(dto BookingDTO, userId string) (model *models.Booking, err error) {
	bookedOn, err := time.Parse("2006-01-02", dto.BookedOn)
	if err != nil {
		return nil, models.CoworkingErr{StatusCode: http.StatusBadRequest, Code: models.DateWrongFormatErr, Message: err.Error()}
	}
	model = &models.Booking{}
	model.ID = utils.GetUuid()
	model.RoomId = dto.RoomId
	model.CreatedAt = time.Now()
	model.BookedOn = bookedOn
	model.UserId = userId
	return
}

func AddBooking(c *gin.Context) {
	var bookingDTO BookingDTO
	if err := c.ShouldBind(&bookingDTO); err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}
	userId := c.MustGet("UserIdKey").(string)
	model, err := mapBookingDtoToModel(bookingDTO, userId)
	if err != nil {
		coworkingErr := err.(models.CoworkingErr)
		c.JSON(coworkingErr.StatusCode, coworkingErr)
		return
	}
	db := c.MustGet("DbKey").(*gorm.DB)
	id, err := models.CreateBooking(db, *model)
	if err != nil {
		coworkingErr := err.(models.CoworkingErr)
		c.JSON(coworkingErr.StatusCode, coworkingErr)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"id": *id})
}
