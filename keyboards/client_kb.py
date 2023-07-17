from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, ReplyKeyboardRemove

btn_operating_mode = KeyboardButton("Режим работы👩‍🍳🧑‍🍳👨‍🍳")
btn_place = KeyboardButton("Расположение⛰🏜")
btn_menu = KeyboardButton("Меню🍙🍱")
btn_cart = KeyboardButton("Корзина")
btn_order = KeyboardButton("Сформировать заказ")
btn_get_contact = KeyboardButton("Отправить мой номер", request_contact = True)
btn_get_gps = KeyboardButton("Отправить моe местоположение", request_location = True)

keyboard_client = ReplyKeyboardMarkup()
keyboard_client_order = ReplyKeyboardMarkup()

keyboard_client_order.add(btn_order)
keyboard_client.add(btn_menu).row(btn_place, btn_operating_mode).row(btn_get_gps,btn_get_contact).add(btn_cart)