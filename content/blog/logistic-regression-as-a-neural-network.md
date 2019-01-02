---
title: 'Logistic Regression as a Neural Network'
date: 2019-01-02T17:01:51.055Z
spoiler: 'Implementation of Logistic Regression as a Neural Network.'
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
  - Logistic Regression
  - Neural Network
---

Github Code: [Logistic Regression with a Neural Network Mindset](https://github.com/sabbiu/deeplearning.ai-coursera/blob/master/p1.coursera_server/Week%202/Logistic%20Regression%20as%20a%20Neural%20Network/Logistic%20Regression%20with%20a%20Neural%20Network%20mindset%20v4.ipynb)

Given $x$, we want $\hat{y} = P(y=1|x)$ where, $0 \leq \hat{y} \leq 1$,  
Parameters: $w \in \R^{n_x}$, $b \in \R$.  
Output: $\hat{y} = \sigma(z)$, where $z=w^Tx+b$

$$
\sigma(z)=\frac{1}{1+e^{-z}}
$$

![Sigmoid Curve](/img/sigmoid-curve.png)

## Loss Function $(\mathcal{L})$

$\mathcal{L} (\hat{y}, y)=\frac{1}{2}(\hat{y} - y)^2$ is not used as it is non-convex and we end up with multiple local optima. So, we use another loss function which is convex.

$$
\mathcal{L} (\hat{y}, y)= -[y \log\hat{y} + (1-y)\log(1-\hat{y})]
$$

We wanted to use square error function to have loss value to be as small as possible.

The negative symbol in the equation is to invert the following log graph (shown in blue in the figure).  
![Log Graph](/img/log-graph.jpg)  
So, For positive samples, Substituting $(y=1)$, we get,

$$
\mathcal{L} (\hat{y}, y)= - \log \hat{y}$$

From above graph, we can see that as $\hat{y}$ approaches $1$, value of $\mathcal{L}$ is close to $0$. Loss is more otherwise.

Again, For negative samples, Substituting $(y=0)$, we get,

$$
\mathcal{L} (\hat{y}, y)= - \log (1-\hat{y})\
$$

As $\hat{y}$ approaches $0$, value of $\mathcal{L}$ is close to $0$.

## Cost Function $(J)$

It is simply the average of loss function through all the examples.

$$
J(w,b) = \frac{1}{m} \Sigma_{i=1}^m \mathcal{L} (\hat{y}^{(i)}, y^{(i)})
$$

Plotting $J$ vs $(w,b)$  
![Cost Function Curve](/img/cost-fn-curve.png)

## Gradient Descent

At first, we randomly initialize $w$ and $b$. Then, we move towards minimum point in the graph.

Repeat until $|w_{old} - w_{new}| < \varepsilon$ and $|b_{old} - b_{new}| < \varepsilon$,

$$
w := w - \alpha \frac{\mathcal{d}J(w,b)}{\mathcal{d}w}\\
b := b - \alpha \frac{\mathcal{d}J(w,b)}{\mathcal{d}b}
$$

### Deriving $\frac{\mathcal{d}J}{\mathcal{d}w}$

Let us substitute $a=\hat{y}$. Using Chain rule,

$$
\frac{\mathcal{d}J}{\mathcal{d}w}= 
\frac{\mathcal{d}J}{\mathcal{dL}} 
\frac{\mathcal{dL}}{\mathcal{d}a} 
\frac{\mathcal{d}a}{\mathcal{d}z}
\frac{\mathcal{d}z}{\mathcal{d}w}
$$

So,

$$
\frac{\mathcal{d}J}{\mathcal{dL}} = 1\\
\frac{\mathcal{dL}}{\mathcal{d}a} = - \frac{y}{a} + \frac{1-y}{1-a}\\
\frac{\mathcal{d}a}{\mathcal{d}z} = a(1-a)\\
\frac{\mathcal{d}z}{\mathcal{d}w} = x
$$

Finally, we get,

$$
\frac{\mathcal{d}J}{\mathcal{d}w}= x(a-y)
$$
