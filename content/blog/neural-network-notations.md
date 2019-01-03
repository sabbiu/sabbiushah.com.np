---
title: 'Neural Network Notations'
date: 2019-01-02T15:47:10.855Z
spoiler: 'Notations of Neural Network used by Andrew Ng in deeplearning.ai course.'
tags:
  - 100DaysOfMLCode
  - deeplearning.ai
keywords:
  - 100DaysOfMLCode
  - machine learning
  - deep learning
  - artificial intelligence
  - Andrew Ng
  - deeplearning.ai
  - Neural Network Notations
---

## Binary Classification

A single example is represented by $(x, y)$, where $x \in \R^{n_x}$ and $y \in \{0,1\}$.  
There are total of $m$ training examples, where $i^{th}$ training example is represented by $(x^{(i)}, y^{(i)})$.  
$m_{\text{train}}$ is used to denote the number of training examples  
$m_{\text{test}}$ is used to denote the number of test examples

So, input matrix $X$ is obtained by stacking $x^{(i)}$ in columns as shown below,

$$
X = \left(\begin{matrix}
  | & | &  & | \\
  x^{(1)} & x^{(2)} & ... & x^{(m)} &\\
  | & | &  & |
\end{matrix}\right)_{n_x \times m}
$$

and output matrix $Y$ is obtained by stacking $y^{(i)}$ in columns as shown below,

$$
Y = \left(\begin{matrix}
  y^{(1)} & y^{(2)} & ... & y^{(m)}
\end{matrix}\right)_{1 \times m}
$$

_Note: Features of same example represents a column and, multiple examples are stacked vertically_  
_Note: Following Notation can be referred when reading specific blog_

## Logistic Regression

![Logistic Regression](/img/log-reg.png)

**Derivative notation:**
$\frac{\mathcal{dL}}{\mathcal{d}w}$ is denoted simply as "$\mathcal{d}w$". This notation is used when the derivative is taken on the end of computation graph with respect to any variable.

## Neural Network Model

### Single Hidden Layer
![NN with single hidden layer](/img/nn-single.png)

