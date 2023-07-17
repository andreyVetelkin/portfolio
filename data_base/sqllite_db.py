import sqlite3 as sq
from create_bot import dp, bot


def sql_start():
    global base, cur
    base= sq.connect(r'data_base/rollFromAndrew.db')
    cur = base.cursor()
    if base:
        print('Data base connected OK!')
        base.execute("""CREATE TABLE IF NOT EXISTS menu(
                     img TEXT,
                     name TEXT PRIMARY KEY,
                     description TEXT,
                     price FLOAT)
                    """)
        base.execute("""CREATE TABLE IF NOT EXISTS users(
                         id INT PRIMARY KEY,
                         id_tg TEXT NOT NULL
                         )
                        """)
        base.execute("""CREATE TABLE IF NOT EXISTS orders(name TEXT, phone TEXT PRIMARY KEY, place TEXT, list_food TEXT )""")

        base.execute("""CREATE TABLE IF NOT EXISTS cart(
                             user TEXT NOT NULL,
                             product TEXT
                             )
                            """)
        base.commit()

async def sql_add_command(state):
    async with state.proxy() as data:
        cur.execute("""INSERT INTO menu VALUES(?, ?, ?, ?)""", tuple(data.values())) #С переводом словаря в кортеж
        base.commit()

async def sql_add_order(state):
    async with state.proxy() as data:
        cur.execute("""INSERT OR IGNORE INTO orders VALUES(?, ?, ?, ?)""", tuple(data.values())) #С переводом словаря в кортеж
        base.commit()

async def sql_add_to_cart(data, message):
    cur.execute("""INSERT OR IGNORE INTO cart VALUES(?, ?)""", (data,message))
    base.commit()

async def sql_get_info(message):
    return cur.execute("""SELECT * FROM menu""").fetchall()

async def sql_select_info_cart(Id):
    return cur.execute("""SELECT * FROM cart """).fetchall()

async def sql_select_order():
    return cur.execute("""SELECT * FROM orders""").fetchall()

async def sql_select_info():
    return cur.execute("""SELECT * FROM menu""").fetchall()

async def delete_after_order():
    cur.execute("""DELETE FROM orders""")

async def sql_delete_from_cart(data):
    cur.execute("""DELETE FROM cart WHERE product == ?""", (data,))
    base.commit()

async def sql_delete_from_cart_all(message):
    cur.execute("""DELETE FROM cart WHERE user == ?""", message.from_user.id)
    base.commit()

async def sql_delete_from_order_admin(data):
    cur.execute("""DELETE FROM orders WHERE phone == ?""", (data,))
    base.commit()

async def sql_delete_command(data):
    cur.execute("""DELETE FROM menu WHERE name == ?""", (data,))
    base.commit()