+++
date = '2025-04-17T20:07:28-07:00'
draft = true
title = 'Auto_cat: Automatically categorize bank and credit card transactions (locally!)'
+++

I write a program to automatically categorize bank transactions into one of the predefined categories (like Groceries, Shopping, Travel, etc). It runs completely on the local computer and does not send data anywhere else. See the example below:

```
  {
    "id": "083df275-8b29-49a7-8cd5-888bfa52xxxx",
    "date": "10/07/2024",
    "amount": "-11.51",
    "description": "PANDA EXPRESS # xxxx",,
    "category": "Food & Drink",
    "model_guess": "Food"
  },
```

`category` is part of the transaction, and `model_guess` is the output of the program. You can find the program code [here on Github](https://github.com/yyl/ai-tools/blob/main/auto_cat.py). It needs a bit testing and polishing, but the results are acceptable - ~10% error rate.

## Why do I need such program

I started looking into the spending of my family around end of last year. One thing interests me is the spending in each category, like Food, Groceries, etc. It turns out calculating such numbers is difficult if the family has multiple banks and credit cards - transactions come in all different formats. Some don't have categories. For those that do, 