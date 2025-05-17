+++
date = '2025-05-17T08:07:28-07:00'
draft = false
title = 'I use a LLM to automatically categorize bank transactions'
tags = ['LLM', 'AI', 'ai dev', 'bank transaction', 'ML', 'embedding', 'language model', 'gemma']
+++

I write a program to automatically categorize bank transactions into one of the predefined categories (like Groceries, Shopping, Travel, etc), like this oen below:

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

`category` is part of the transaction - some transactions have it some don't it. `model_guess` is the output of the program. You can find the program code [here on Github](https://github.com/yyl/ai-tools/blob/main/auto_cat.py). 

The main motivation is privacy. There are a lot of personal finance services out there with great features, but they either require me to upload bank data to their website, or share bank credentials so they can pull data directly. I don't want to do either of them. Instead, I'd like something to do what I want locally - nothing fancy, just some simple summary of my spend and breakdown by year, month and category is more than sufficient. That narrows the problem to categorize transactions.

There are many existing work. [This](https://github.com/robintw/BankClassify) one overall is the best but it requires user to manually review every label and requires extra processing for different bank format; [this](https://github.com/eli-goodfriend/banking-class) one comes with too many bags e.g. it still depends on Python 2; and [this](https://github.com/j-convey/MoneyMap-AI#) one requires powerful GPUs to train the model at the first place. 

Majority of the transactions actually already have a category value assigned by the bank and I do trust their correctness. For them, I just need to unify categories from different banks then that's done. That leaves me transactions without categories - about 25%.

I tried a few ways that didn't work. At first I generate text embedding per transaction and try to cluster them all. The clusters didn't look great, and is very prone to over-cluster. Then I use local LLM to label each transaction - it's a hit or miss at first. At some point I try to use LLM output to train a traditional ML model - but it just sounds too complex for such a single task. 

Eventually I settle on the current method - use local LLM but cramming as many as previous categorized examples in the context window, and then build a way to correct LLM output. The script persists everything so the corrected category would also be used as previous example in the next batch of categorizing. I use Gemma 3 which provides 128k context window so very sufficient for my use case. It is also just generally much better at this task than other LLMs (Mistral, Llama, etc).

This is the first time I incorporate LLM to my program. It takes some time to get used to, especially around making it reliable enough to be used. For example the initial results out of LLM are not good enough until I leverage the context window and put in a lot of previous examples. Writing a program that uses a LLM is very different from the traditional programming, and can be a lot more efficient and powerful than the latter too - I get what is the buzz of AI developers now!