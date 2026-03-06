import xlwings as xw
import os
import time
from pathlib import Path

def add_vba_macros():
    # Проверяем, существует ли файл Excel
    excel_file = 'stardew_valley_bundles.xlsx'
    if not os.path.exists(excel_file):
        print(f"Файл {excel_file} не найден. Сначала запустите create_bundles_excel.py")
        return

    # Запускаем Excel и открываем книгу
    print("Открываем файл в Excel...")
    try:
        # Открываем книгу с помощью xlwings
        app = xw.App(visible=False)
        wb = app.books.open(os.path.abspath(excel_file))
        
        # Код VBA, который будет добавлен на каждый лист
        vba_code = """
Private Sub Worksheet_SelectionChange(ByVal Target As Range)
    If Target.Column = 3 Then  ' Колонка C - галочки
        If Target.Value = "□" Then
            Target.Value = "☑"
        ElseIf Target.Value = "☑" Then
            Target.Value = "□"
        End If
    End If
End Sub
"""
        
        # Добавляем VBA код на все листы кроме "Главная"
        print("Добавляем макросы на листы...")
        for sheet in wb.sheets:
            if sheet.name != "Главная":
                # Доступ к VBA модулю листа
                sheet_module = wb.api.VBProject.VBComponents(sheet.name)
                
                # Добавляем код в модуль листа
                sheet_module.CodeModule.AddFromString(vba_code)
        
        # Сохраняем как .xlsm файл (с поддержкой макросов)
        xlsm_file = excel_file.replace('.xlsx', '.xlsm')
        print(f"Сохраняем файл как {xlsm_file}...")
        wb.save(os.path.abspath(xlsm_file))
        
        # Закрываем книгу и Excel
        wb.close()
        app.quit()
        
        print(f"Готово! Файл {xlsm_file} создан с макросами.")
        print("При клике на □ в колонке 'Выполнено' он будет автоматически переключаться на ☑ и обратно.")
        print("Предмет будет подсвечиваться зеленым цветом при установке галочки.")
        
    except Exception as e:
        print(f"Произошла ошибка: {e}")
        if 'app' in locals():
            try:
                app.quit()
            except:
                pass

if __name__ == "__main__":
    add_vba_macros() 