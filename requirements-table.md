| Actors           | Command  | Data    | Event |
|----------------| --------| -------| -------|
| Работник, менеджер, администратор | Создать таску | Task | Task.Created |
| Task.Created event | Определить стоимость задачи | Task, ProfitRules | Task.ProfitDefined |
| Администратор, менеджер   | Назначить открытые задачи      |   Task, Profiles | System.StartTaskAssignment |
| StartTaskAssignment event | Назначить задачу     | Task , Profile  | TaskAssigned |
|StartTaskAssignment event | Списать стоимость задачи с счета исполнителя | Task, Profile, Account | AccountStateDecreased | 
| Работник | Выполнить задачу | Task, Profile | TaskCompleted|
| TaskCompleted event | Насчитать профит от задачи на баланс выполнившего | Profile, Account, Task | ProfitAccrued |
| System | Посчитать баланс на конец дня | Profile, Account, Task| BalanceCalculated |


Также попробовал стикеры в [miro](https://miro.com/app/board/o9J_lQrq8MA=/)