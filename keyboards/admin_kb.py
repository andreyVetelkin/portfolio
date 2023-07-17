from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, ReplyKeyboardRemove

btn_admin_cancel = KeyboardButton("/отмена🚫")
btn_admin_load = KeyboardButton("/Загрузить_позицию⬆")
btn_admin_delete = KeyboardButton("/Удалить_позицию❌")
btn_admin_orders = KeyboardButton("/Посмотреть_заказы👁✉️")
btn_admin_back = KeyboardButton("/start")

keyboard_admin = ReplyKeyboardMarkup(resize_keyboard=True, one_time_keyboard=True)
keyboard_admin.add(btn_admin_load).add(btn_admin_delete).add(btn_admin_cancel).add(btn_admin_back).add(btn_admin_orders)

keyboard_admin_only_cancel = ReplyKeyboardMarkup(resize_keyboard=True, one_time_keyboard=True)
keyboard_admin_only_cancel.row(btn_admin_cancel)