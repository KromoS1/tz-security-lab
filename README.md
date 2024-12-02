Есть список, который может работать в 2 режимах:

- добавление новых записей раз в секунду
- удаление записей по 1 в секунду

режимы меняются по нажатию на кнопку Change mode

Также есть возможность добавить элемент в список по нажатию на кнопку "Add to end"

Условия задания.

1. оптимизировать кол-во ререндеров всех компонентов
2. реализовать удаление выбранных элемент списка
3. реализовать добавление элементов списка в начало при нажатии на кнопку Add to start
4. при переключении режима работы списка - добавление и удаление элементов должно происходить по 1 шт
5. при нажатии на элемент списка должна происходить анимация пульсации 1 раз (без добавления стилей, классов и т.д.)
6. при добавлении элемента списка в начало должна вызываться анимация пульсации 1 раз (без добавления стилей, классов и т.д.)
7. избавиться от дублирования кода для кнопок (реализовать переиспользуемый компонент) +
8. переменную index убрать из глобальной видимости, занести в компонент List

Ограничения по выполнению

- Компонент List не должен дробиться на более мелкие компоненты
- Добавление новых стилей/анимаций запрещено
- использование сторонних библиотек запрещено