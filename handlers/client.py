from aiogram import types, Dispatcher
from create_bot import dp, bot
from keyboards.client_kb import keyboard_client, keyboard_client_order
from keyboards.admin_kb import keyboard_admin_only_cancel
from data_base import sqllite_db
from aiogram.dispatcher.filters import Text
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

class FSMOrder(StatesGroup):
    name = State()
    phone = State()
    place = State()
    list_food = State()

@dp.message_handler(Text(equals='Сформировать заказ'))
async def order(message : types.Message):
    await FSMOrder.name.set()
    await bot.send_message(message.from_user.id, "Введите свое имя", reply_markup=keyboard_admin_only_cancel)

async def cancel_order(message: types.Message, state: FSMContext):
        current_state = await state.get_state()
        if current_state is None:
            return
        else:
            await state.finish()
            await message.reply("Заказ отменен", reply_markup=keyboard_client)
            await sqllite_db.delete_after_order()

async def load_name_for_order(message: types.Message, state: FSMContext):
        async with state.proxy() as data:
            data['name'] = message.text
        await FSMOrder.next()
        await message.reply("Теперь введите номер телефона", reply_markup=keyboard_admin_only_cancel)

async def load_phone(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['phone'] = message.text
    await FSMOrder.next()
    await message.reply("Теперь введите адрес доставки", reply_markup=keyboard_admin_only_cancel)

async def load_place(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['place'] = message.text
        food = ''
        cart = await sqllite_db.sql_select_info_cart()
        for i in cart:
            food+= '\n '+i[1]
        data['list_food'] = food
    await sqllite_db.sql_add_order(state)
    await state.finish()
    await bot.send_message(message.from_user.id, "Заказ создан", reply_markup=keyboard_client)
    #await sqllite_db.sql_delete_from_cart_all(message.from_user.id)

async def add_to_cart(call : types.CallbackQuery):
    await sqllite_db.sql_add_to_cart(call.from_user.id, call.data.replace("add ", ""))
    await call.answer(text=f'Ролл {call.data.replace("add ", "")} добавлен в корзину.', show_alert=True)

async def see_to_cart(message : types.Message):
    cart = await sqllite_db.sql_select_info_cart(message.from_user.id)
    for i in cart:
        await bot.send_message(message.from_user.id, i[1],reply_markup=InlineKeyboardMarkup().add(InlineKeyboardButton(text='⬆Удалить из корзины', callback_data=f'delCart {i[1]}')))
    await bot.send_message(message.from_user.id, text='🛒', reply_markup=keyboard_client_order)

async def del_from_cart_callback(callb : types.CallbackQuery):
    await sqllite_db.sql_delete_from_cart(callb.data.replace("delCart ", ""))
    await callb.answer(text= f'Запись {callb.data.replace("delCart ", "")} удалена.', show_alert= True)




async def command_menu(message: types.Message):
    info = await sqllite_db.sql_get_info(message)
    for i in info:
        await bot.send_photo(message.from_user.id, i[0], f'{i[1]}\nОписание: {i[2]}\nЦена: {i[3]}',reply_markup=InlineKeyboardMarkup().add(InlineKeyboardButton(text='Добавить в корзину', callback_data=f'add {i[1]}')))

async def command_start(message: types.Message):
    try:
        await bot.send_sticker(chat_id=message.from_user.id,sticker=r'CAACAgIAAxkBAAEF-tpjOY_7zNg6o0PePrp1_B07AVNJoQACawMAAm2wQgMBxrMf3Ej7GioE')
        await bot.send_message(message.from_user.id, "Добро пожаловать в СушиШоп", reply_markup=keyboard_client)
        await message.delete()
    except:
        await message.reply("Общение с ботом через ЛС, напишите туда)")


async def command_time_work(message: types.Message):
    await bot.send_message(message.from_user.id, "Пн-Пт 10:00 - 21:00\nСб-Вс 10:00 - 20:00")


async def command_place(message: types.Message):
    await bot.send_message(message.from_user.id, "Энгельс, Ул.Ленина 48")


def register_handlers_client(dp: Dispatcher):
    dp.register_callback_query_handler(del_from_cart_callback, Text(startswith="delCart "))
    dp.register_message_handler(cancel_order, state="*", commands='отмена🚫')
    dp.register_message_handler(cancel_order, Text(equals='Отмена', ignore_case=True), state="*")
    dp.register_message_handler(load_name_for_order, state=FSMOrder.name)
    dp.register_message_handler(load_phone, state=FSMOrder.phone)
    dp.register_message_handler(load_place, state=FSMOrder.place)
    dp.register_message_handler(see_to_cart, Text(equals="Корзина"))
    dp.register_callback_query_handler(add_to_cart, Text(startswith="add "))
    dp.register_message_handler(command_start, commands=['start', 'help'])
    dp.register_message_handler(command_time_work, Text(equals='Режим работы👩‍🍳🧑‍🍳👨‍🍳'))
    dp.register_message_handler(command_place, Text(equals='Расположение⛰🏜'))
    dp.register_message_handler(command_menu, Text(equals='Меню🍙🍱'))
