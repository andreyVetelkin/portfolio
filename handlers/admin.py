from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from create_bot import dp, bot
from aiogram import types, Dispatcher
from aiogram.dispatcher.filters import Text
from keyboards.admin_kb import keyboard_admin, keyboard_admin_only_cancel
from data_base import sqllite_db
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

ID = None


class FSMAdmin(StatesGroup):
    img = State()
    name = State()
    description = State()
    price = State()


# Проверка на админа

async def isAdmin(message: types.Message):
    global ID
    ID = message.from_user.id
    await bot.send_message(message.from_user.id, 'Здравствуй, хозяин', reply_markup=keyboard_admin)
    await message.delete()


async def admin_start(message: types.Message):
    if message.from_user.id == ID:
        await FSMAdmin.img.set()
        await message.reply("Загрузи фото", reply_markup=keyboard_admin_only_cancel)


async def cancel_handler(message: types.Message, state: FSMContext):
    if message.from_user.id == ID:
        current_state = await state.get_state()
        if current_state is None:
            return
        else:
            await state.finish()
            await message.reply("Загрузка отменена", reply_markup=keyboard_admin)


async def load_img(message: types.Message, state: FSMContext):  # Обязательно параметры с аннотатцией!
    if message.from_user.id == ID:
        async with state.proxy() as data:  # Кидаем все в словарь
            data['photo'] = message.photo[0].file_id  # Берем id который телега присваивает всем отправленным файлам
        await FSMAdmin.next()
        await message.reply("Теперь введи название", reply_markup=keyboard_admin_only_cancel)


async def load_name(message: types.Message, state: FSMContext):
    if message.from_user.id == ID:
        async with state.proxy() as data:
            data['name'] = message.text
        await FSMAdmin.next()
        await message.reply("Теперь введи описание", reply_markup=keyboard_admin_only_cancel)


async def load_description(message: types.Message, state: FSMContext):
    if message.from_user.id == ID:
        async with state.proxy() as data:
            data['description'] = message.text
        await FSMAdmin.next()
        await message.reply("Теперь введи цену", reply_markup=keyboard_admin_only_cancel)


async def load_price(message: types.Message, state: FSMContext):
    if message.from_user.id == ID:
        async with state.proxy() as data:
            data['price'] = float(message.text)

        await sqllite_db.sql_add_command(state)
        await state.finish()
        await bot.send_message(message.from_user.id, "Загрузка прошла успешно", reply_markup=keyboard_admin)

async def del_callback(call : types.CallbackQuery):
    await sqllite_db.sql_delete_command(call.data.replace("del ", ""))
    await call.answer(text= f'Запись {call.data.replace("del ", "")} удалена.', show_alert= True)

async def delete_from_db(message: types.Message):
    if message.from_user.id == ID:
        list_sql = await sqllite_db.sql_select_info()
        for i in list_sql:
            await bot.send_photo(message.from_user.id, i[0], f'{i[1]}\nОписание: {i[2]}\nЦена: {i[3]}')
            await bot.send_message(message.from_user.id, text="⬆", reply_markup=InlineKeyboardMarkup().add(InlineKeyboardButton(f'Удалить {i[1]}', callback_data=f'del {i[1]}')))

async def orders(message : types.Message):
    curret = await sqllite_db.sql_select_order()
    for i in curret:
        await bot.send_message(message.from_user.id, f'Имя: {i[0]}\nНомер телефона: {i[1]}\nАдрес доставки: {i[2]}\nЗаказ: {i[3]}', reply_markup=InlineKeyboardMarkup().add(InlineKeyboardButton(f'⬆Удалить заказ', callback_data=f'delOrder {i[1]}')))

async def del_order_admin(call : types.CallbackQuery):
    await sqllite_db.sql_delete_from_order_admin(call.data.replace("delOrder ", ""))
    await call.answer(text= f'Заказ {call.data.replace("delOrder ", "")} удален.', show_alert= True)



# Регистрируем хендлеры
def register_handlers_admin(dp: Dispatcher):
    dp.register_message_handler(delete_from_db, commands=["Удалить_позицию❌"])
    dp.register_callback_query_handler(del_callback,Text(startswith="del "))
    dp.register_message_handler(isAdmin, commands=['moder'], is_chat_admin=True)
    dp.register_message_handler(admin_start, commands=['Загрузить_позицию⬆'], state=None)
    dp.register_message_handler(cancel_handler, state="*", commands='отмена🚫')
    dp.register_message_handler(orders, commands='Посмотреть_заказы👁✉️')
    dp.register_callback_query_handler(del_order_admin, Text(startswith="delOrder "))
    dp.register_message_handler(cancel_handler, Text(equals='Отмена', ignore_case=True), state="*")
    dp.register_message_handler(load_img, content_types=['photo'], state=FSMAdmin.img)
    dp.register_message_handler(load_name, state=FSMAdmin.name)
    dp.register_message_handler(load_description, state=FSMAdmin.description)
    dp.register_message_handler(load_price, state=FSMAdmin.price)
