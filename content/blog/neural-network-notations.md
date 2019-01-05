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
*This blog is a part of [deeplearning.ai series](/deeplearning-ai-andrew-ng-coursera)*

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

![NN with single hidden layer](/img/nn-single.png)

This Neural Network is also known as 2 layer Neural Network.

**Input**  
$x_i$ represents $i^{\text{th}}$ input node. Also represented as $a_i^{[0]}$, i.e, $i^{\text{th}}$ node of layer $0$  
$x$ (also $a^{[0]}$) represents vector comprising all the nodes $x_i$ i.e, $\left(\begin{matrix} x_1\\ x_2 \end{matrix}\right)$

**Hidden Layer $l$**  
$a_i^{[l]}$ represents activation of $i^{\text{th}}$ node of layer '$l$'  
$a^{[l]}$ represents activation vector comprising all the nodes of layer '$l$'$\left(\begin{matrix}a_1^{[l]}\\ a_2^{[l]}\\ a_3^{[l]}\\ a_4^{[l]} \end{matrix}\right)$   
$A^{[l]} \in \R(\text{\# of nodes in layer l}, m)$, Capital letter represents all the examples stacked vertically  
$W_{ij}^{[l]}$ represents weight of $i^{\text{th}}$ node for layer '$l$' with respect to $j^{\text{th}}$ node of previous layer.  
$W^{[l]}$ is Weight matrix having dimension $(\text{\#}nodes_l, \text{\#}nodes_{(l-1)})$ i.e, (number of nodes in current layer, number of nodes in previous layer) 

**Output**  
The value of '$l$' in output layer is 'L'.
