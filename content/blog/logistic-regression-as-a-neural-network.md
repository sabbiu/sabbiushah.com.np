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
*This blog is a part of [deeplearning.ai series](/deeplearning-ai-andrew-ng-coursera)  
Github Code: [Logistic Regression with a Neural Network Mindset](https://github.com/sabbiu/deeplearning.ai-coursera/blob/master/p1.coursera_server/Week%202/Logistic%20Regression%20as%20a%20Neural%20Network/Logistic%20Regression%20with%20a%20Neural%20Network%20mindset%20v4.ipynb)*

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

The negative symbol in the equation is to invert the following log graph (inverted graph is shown in blue colour).  
![Log Graph](/img/log-graph.jpg)  
So, For positive samples, Substituting $(y=1)$, we get,

$$
\mathcal{L} (\hat{y}, y)= - \log \hat{y}
$$

From above graph, we can see that as $\hat{y}$ approaches $1$, value of $\mathcal{L}$ is close to $0$. Else, Loss is more.

Again, For negative samples, Substituting $(y=0)$, we get,

$$
\mathcal{L} (\hat{y}, y)= - \log (1-\hat{y})
$$

As $\hat{y}$ approaches $0$, value of $\mathcal{L}$ is close to $0$.

## Cost Function $(J)$

It is simply the average of loss function through all the examples.

$$
J(w,b) = \frac{1}{m} \sum_{i=1}^m \mathcal{L} (\hat{y}^{(i)}, y^{(i)})
$$

Plotting $J$ vs $(w,b)$  
![Cost Function Curve](/img/cost-fn-curve.png)

## Gradient Descent

At first, we randomly initialize $w$ and $b$. Then, we move towards minimum point in the graph.

Repeat the following steps till the algorithm converges,

$$
\begin{aligned}
w & := w - \alpha \frac{\mathcal{d}J(w,b)}{\mathcal{d}w}\\
b & := b - \alpha \frac{\mathcal{d}J(w,b)}{\mathcal{d}b}
\end{aligned}
$$

Here, $\alpha$ represents learning rate, and controls how big a step to take on each iteration of gradient descent.

## Deriving $\frac{\mathcal{d}J}{\mathcal{d}w}$

Let us substitute $a=\hat{y}$. Using Chain rule,

$$
\frac{\mathcal{dL}}{\mathcal{d}w}=
\frac{\mathcal{dL}}{\mathcal{d}a}
\frac{\mathcal{d}a}{\mathcal{d}z}
\frac{\mathcal{d}z}{\mathcal{d}w}
$$

So,

$$
\begin{aligned}
\frac{\mathcal{dL}}{\mathcal{d}a} & = - \frac{y}{a} + \frac{1-y}{1-a}\\
\frac{\mathcal{d}a}{\mathcal{d}z} & = a(1-a)\\
\frac{\mathcal{d}z}{\mathcal{d}w} & = x
\end{aligned}
$$

Finally, we get,

$$
\frac{\mathcal{d}J}{\mathcal{d}w}=
\frac{1}{m} \sum_{i=1}^m
x^{(i)}(a^{(i)}-y^{(i)})
$$

## Python Code

For detail, refer to ipynb file mentioned above.

![Logistic Regression](/img/log-reg.png)

### Forward and Backward Substitution

```python
def propagate(w, b, X, Y):
    """
    Implementation of cost function and its gradient for the propagation

    Arguments:
    w -- weights, a numpy array of size (num_px * num_px * 3, 1)
    b -- bias, a scalar
    X -- data of size (num_px * num_px * 3, number of examples)
    Y -- true "label" vector (containing 0 if non-cat, 1 if cat) of size (1, number of examples)

    Return:
    cost -- negative log-likelihood cost for logistic regression
    dw -- gradient of the loss with respect to w, thus same shape as w
    db -- gradient of the loss with respect to b, thus same shape as b
    """
    m = X.shape[1]

    # FORWARD PROPAGATION (FROM X TO COST)
    A = sigmoid(np.dot(w.T,X)+b) # compute activation
    cost = (-1/m) * np.sum(
                        np.multiply(Y, np.log(A)) +
                        np.multiply((1 - Y), np.log(1 - A))
                    ) # compute cost

    # BACKWARD PROPAGATION (TO FIND GRAD)
    dw = (1/m) * np.dot(X, (A - Y).T)
    db = (1/m) * np.sum(A - Y)

    grads = { "dw": dw, "db": db }

    return grads, cost
```

### Optimization

```python
def optimize(w, b, X, Y, num_iterations, learning_rate, print_cost = False):
    """
    This function optimizes w and b by running a gradient descent algorithm

    Arguments:
    w -- weights, a numpy array of size (num_px * num_px * 3, 1)
    b -- bias, a scalar
    X -- data of shape (num_px * num_px * 3, number of examples)
    Y -- true "label" vector (containing 0 if non-cat, 1 if cat), of shape (1, number of examples)
    num_iterations -- number of iterations of the optimization loop
    learning_rate -- learning rate of the gradient descent update rule
    print_cost -- True to print the loss every 100 steps

    Returns:
    params -- dictionary containing the weights w and bias b
    grads -- dictionary containing the gradients of the weights and bias with respect to the cost function
    costs -- list of all the costs computed during the optimization, this will be used to plot the learning curve.
    """
    costs = []

    for i in range(num_iterations):
        # Cost and gradient calculation (≈ 1-4 lines of code)
        grads, cost = propagate(w,b,X,Y)

        # Retrieve derivatives from grads
        dw = grads["dw"]
        db = grads["db"]

        # update rule (≈ 2 lines of code)
        w = w - learning_rate * dw
        b = b - learning_rate * db

        # Record the costs
        if i % 100 == 0:
            costs.append(cost)

        # Print the cost every 100 training examples
        if print_cost and i % 100 == 0:
            print ("Cost after iteration %i: %f" %(i, cost))

    params = { "w": w, "b": b }
    grads = { "dw": dw, "db": db }

    return params, grads, costs
```

### Prediction

```python
def predict(w, b, X):
    '''
    Predict whether the label is 0 or 1 using learned logistic regression parameters (w, b)
    
    Arguments:
    w -- weights, a numpy array of size (num_px * num_px * 3, 1)
    b -- bias, a scalar
    X -- data of size (num_px * num_px * 3, number of examples)
    
    Returns:
    Y_prediction -- a numpy array (vector) containing all predictions (0/1) for the examples in X
    '''
    m = X.shape[1]
    Y_prediction = np.zeros((1, m))
    w = w.reshape(X.shape[0], 1)
    
    # Compute vector "A" predicting the probabilities of a cat being present in the picture
    A = sigmoid(np.dot(w.T, X) + b)
    Y_prediction = np.round(A)
    
    return Y_prediction
```

### Model

```python
def model(X_train, Y_train, X_test, Y_test, num_iterations = 2000, learning_rate = 0.5, print_cost = False):
    """
    Builds the logistic regression model by calling the function implemented previously
    
    Arguments:
    X_train -- training set represented by a numpy array of shape (num_px * num_px * 3, m_train)
    Y_train -- training labels represented by a numpy array (vector) of shape (1, m_train)
    X_test -- test set represented by a numpy array of shape (num_px * num_px * 3, m_test)
    Y_test -- test labels represented by a numpy array (vector) of shape (1, m_test)
    num_iterations -- hyperparameter representing the number of iterations to optimize the parameters
    learning_rate -- hyperparameter representing the learning rate used in the update rule of optimize()
    print_cost -- Set to true to print the cost every 100 iterations
    
    Returns:
    d -- dictionary containing information about the model.
    """
    
    # initialize parameters with zeros (≈ 1 line of code)
    w, b = initialize_with_zeros(X_train.shape[0])

    # Gradient descent (≈ 1 line of code)
    parameters, grads, costs = optimize(w, b, X_train, Y_train, num_iterations, learning_rate, print_cost)
    
    # Retrieve parameters w and b from dictionary "parameters"
    w = parameters["w"]
    b = parameters["b"]
    
    # Predict test/train set examples (≈ 2 lines of code)
    Y_prediction_test = predict(w,b,X_test)
    Y_prediction_train = predict(w,b,X_train)

    d = {
      "costs": costs,
      "Y_prediction_test": Y_prediction_test, 
      "Y_prediction_train" : Y_prediction_train, 
      "w" : w, 
      "b" : b,
      "learning_rate" : learning_rate,
      "num_iterations": num_iterations
    }
    
    return d
```

## Extras

**Deriving $\frac{\mathcal{d}a}{\mathcal{d}z}$**

We know, $a = \sigma(z)=\frac{1}{1+e^{-z}}$

$$
\begin{aligned}
\frac{\mathcal{d}a}{\mathcal{d}z} & = \frac{\mathcal{d}}{\mathcal{d}z}
\left(\frac{1}{1+e^{-z}}\right)\\
& = \frac{- e^{-z}(-1)}{(1+e^{-z})^2}\\
& = \left(\frac{1}{1+e^{-z}}\right)\left(\frac{e^{-z}}{1+e^{-z}}\right)\\
& = \left(\frac{1}{1+e^{-z}}\right)\left(1-\frac{1}{1+e^{-z}}\right)\\
& = a(1-a)\\
\end{aligned}
$$
