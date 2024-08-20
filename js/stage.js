const stages = [
    {
        table: [//1
            ['s', '', '', '=1'],
            ['', '+1', '-1', ''],
            ['', '', '', ''],
            ['', '', '', ''],
        ],
        level: 1,
        goal: 1
    },
    {
        table: [
            ['', '+2', '+1', ''],
            ['', '', '-2', ''],
            ['-1', 's', '', ''],
            ['', '', '=2', ''],
        ],
        level: 1,
        goal: 2
    },
    {
        table: [
            ['', '+4', '', '=3'],
            ['-2', '+7', '', ''],
            ['-1', '', '', ''],
            ['s', '', '-1', ''],
        ],
        level: 1,
        goal: 3
    },
    {
        table: [
            ['+2', '', '', ''],
            ['', '+1', '', 's'],
            ['+1', '', '', '=4'],
            ['', '-3', '+1', ''],
        ],
        level: 1,
        goal: 4
    },
    {
        table: [
            ['', '+2', 's', ''],
            ['', '', '+1', ''],
            ['*2', '', '', '-1'],
            ['', '+2', '-1', '=5'],
        ],
        level: 1,
        goal: 5
    },
    {
        table: [
            ['', 's', '', '*2'],
            ['', '-1', '', '=6'],
            ['+1', '', '+1', '+2'],
            ['', '', '*3', ''],
        ],
        level: 1,
        goal: 6
    },
    {
        table: [
            ['', 's', '+3', '+2'],
            ['-2', '', '', '*2'],
            ['-3', '+1', '', ''],
            ['', '+1', '=7', ''],
        ],
        level: 1,
        goal: 7
    },
    {
        table: [
            ['-1', '', '-3', ''],
            ['', '*3', '', 's'],
            ['', '', '+2', ''],
            ['=8', '+1', '', '+2'],
        ],
        level: 1,
        goal: 8
    },
    {
        table: [
            ['', '+1', '', ''],
            ['', 's', '*2', ''],
            ['*4', '', '', '+1'],
            ['', '+2', '=9', ''],
        ],
        level: 1,
        goal: 9
    },
    {
        table: [
            ['', '*5', '', '+1'],
            ['-1', '', 's', ''],
            ['+3', '-3', '+2', ''],
            ['', '=10', '+2', '+2'],
        ],
        level: 1,
        goal: 10
    },
    {
        table: [
            ['', '-1', '*2', ''],
            ['*-2', '', '=11', '+1'],
            ['+1', '', 's', ''],
            ['', '*3', '-1', ''],
        ],
        level: 1,
        goal: 11
    },
    {
        table: [
            ['', '=12', '*2', ''],
            ['+2', '', '-1', ''],
            ['', '+1', '', '*2'],
            ['+2', '', 's', '+2'],
        ],
        level: 1,
        goal: 12
    },
    {
        table: [
            ['', '-3', '*-3', '+1'],
            ['+1', '', '', '=13'],
            ['*2', '', '', '*-1'],
            ['s', '', '*-2', ''],
        ],
        level: 1,
        goal: 13
    },
    {
        table: [
            ['+2', '', '+1', '*1.2'],
            ['s', '', '', '+2'],
            ['+2', '', '-3', ''],
            ['', '*3', '', '=14'],
        ],
        level: 1,
        goal: 14
    },
    {
        table: [
            ['+2', '', 's', '*2'],
            ['', '*2', '', '*-1.75'],
            ['=15', '+2', '*-1', '*2'],
            ['', '', '+1', ''],
        ],
        level: 1,
        goal: 15
    },
    {
        table: [
            ['', '+3', '', ''],
            ['+1', '', '/2', ''],
            ['=16', '', '*8', '*3'],
            ['-2', '+5', 's', '+1'],
        ],
        level: 1,
        goal: 16
    },
    {
        table: [
            ['*4', '/8', '', '+6'],
            ['', '*5', '=17', ''],
            ['', '+1', '', '+5'],
            ['+2', 's', '*2', ''],
        ],
        level: 2,
        goal: 17
    },
    {
        table: [
            ['*2', '+1', '', '+2'],
            ['-1', '', '+1', '=18'],
            ['+4', '', '*4', ''],
            ['*2', '+2', 's', '+1'],
        ],
        level: 2,
        goal: 18
    },
    {
        table: [
            ['s', '', '+4', ''],
            ['*2', '+1', '', '*-2'],
            ['+2', '', '*-1', ''],
            ['=19', '-1', '', '*2'],
        ],
        level: 2,
        goal: 19
    },
    {
        table: [
            ['*2', '-1', 's', '+2'],
            ['', '', '+2', ''],
            ['-2', '-3', '**2', '+4'],
            ['*5', '=20', '', '*5'],
        ],
        level: 2,
        goal: 20
    },
    {
        table: [
            ['', '/2', '/3', '+1'],
            ['+3', '', 's', '+1'],
            ['', '', '**2', ''],
            ['=21', '*0.75', '', '*-3'],
        ],
        level: 2,
        goal: 21
    },
    {
        table: [
            ['*4', '', '+2', ''],
            ['=22', '**2', '', 's'],
            ['-1', '+5', '', ''],
            ['', '*3', '', '*3'],
        ],
        level: 2,
        goal: 22
    },
    {
        table: [
            ['s', '*2', '', '+3'],
            ['', '+2', '', ''],
            ['**3', '-1', '', '-2'],
            ['-2', '', '-3', '=23'],
        ],
        level: 2,
        goal: 23
    },
    {
        table: [
            ['*2', '+1', '=24', '+3'],
            ['', '', '*1.75', ''],
            ['', '*-2', '+2', 's'],
            ['*-3', '', '', '+1'],
        ],
        level: 2,
        goal: 24
    },
    {
        table: [
            ['=25', 's', '', '+3'],
            ['', '*4', '+1', ''],
            ['', '', '-3', '+2'],
            ['*2.5', '', '', '/2'],
        ],
        level: 2,
        goal: 25
    },
    {
        table: [
            ['*2', '', '+10', ''],
            ['-1', '=26', '+3', '*-1'],
            ['', '**3', 's', ''],
            ['*8', '', '+6', ''],
        ],
        level: 2,
        goal: 26
    },
    {
        table: [
            ['+1', '+2', '+1', '**2'],
            ['+5', 's', '', '+1'],
            ['*3/4', '=27', '+2', ''],
            ['', '', '', '*3'],
        ],
        level: 2,
        goal: 27
    },
    {
        table: [
            ['-1', '', '+5', '+2'],
            ['', '*3', 's', ''],
            ['', '+1', '=28', '+2'],
            ['*3', '', '+1', ''],
        ],
        level: 2,
        goal: 28
    },
    {
        table: [
            ['-4', '*5', '', '=29'],
            ['+6', '+1', '*2', ''],
            ['s', '', '', '-1'],
            ['*3', '+1', '*3', ''],
        ],
        level: 2,
        goal: 29
    },
    {
        table: [
            ['s', '+7', '', '*2'],
            ['=30', '*3', '/5', ''],
            ['+2', '+8', '*2', '+6'],
            ['', '*5', '', '*2'],
        ],
        level: 2,
        goal: 30
    },
    {
        table: [
            ['', '/4', '*4', '+7'],
            ['=31', '+8', '*3', ''],
            ['-3', '+5', '+1', 's'],
            ['*2', '/3', '*2', '+1'],
        ],
        level: 2,
        goal: 31
    },
    {
        table: [
            ['+2', '**3', '*2', '=32'],
            ['s', '+2', '-1', ''],
            ['+4', '**5', '*3', '+2'],
            ['', '', '/4', '+8'],
        ],
        level: 2,
        goal: 32
    },
    {
        table: [
            ['**2', '/2', '', '*4'],
            ['+3', '+7', 's', ''],
            ['-1', '**2', '+4', '+1'],
            ['+1', '*3', '**0', '=33'],
        ],
        level: 3,
        goal: 33
    },
    {
        table: [
            ['=34', '', '', '**0'],
            ['*4', '+1', '+5', 's'],
            ['', '+6', '', '*7'],
            ['+6', '', '', '/2'],
        ],
        level: 3,
        goal: 34
    },
    {
        table: [
            ['', '*3', '', '+3'],
            ['', '+2', '', 's'],
            ['', '%5', '+1', '*5'],
            ['=35', '-1', '-1', '+2'],
        ],
        level: 3,
        goal: 35
    },
    {
        table: [
            ['', '+1', 's', '+4'],
            ['-3', '', '*-2', '*2'],
            ['', '+2', '', ''],
            ['**2', '=36', '*-1', ''],
        ],
        level: 3,
        goal: 36
    },
    {
        table: [
            ['+2', '+1', '+13', '+5'],
            ['+30', '%5', '+2', 's'],
            ['=37', '+7', '+1', '+3'],
            ['+36', '+2', '%5', '+1'],
        ],
        level: 3,
        goal: 37
    },
    {
        table: [
            ['=38', '%4', '', 's'],
            ['', '+2', '*3', '+3'],
            ['+2', '-1', '-1', '*3'],
            ['*4', '', '', '*3'],
        ],
        level: 3,
        goal: 38
    },
    {
        table: [
            ['', '+6', '', 's'],
            ['*5', '%8', '', '+7'],
            ['', '', '+2', '-1'],
            ['%5', '*3', '=39', '*39'],
        ],
        level: 3,
        goal: 39
    },
    {
        table: [
            ['=40', '*2', '*5', '**0'],
            ['**0', '*2', '*2', '*2'],
            ['', '**4', '**2', '*5'],
            ['*5', '*2', '**0', 's'],
        ],
        level: 3,
        goal: 40
    },
]