export const IP_LAYER_GUIDELINE = "The First Layer in the Neural Network is the Number of features in the input. You can build the hidden layers as per your model. The Last Layer of the Network is the number of layers in the output";

export const ACTIVATION_FUNCTION_OPTIONS = [
	{ key: 1, text: 'ReLu', value: 'relu' },
	{ key: 2, text: 'Sigmoid', value: 'sigmoid' },
	{ key: 3, text: 'Soft Max', value: 'softmax' },
]

export const LOSS_FUNCTION_BINARY = [
	{ key: 1, text: 'MSE Loss', value: 'mse' },
	{ key: 3, text: 'Binary Cross Entropy Loss', value: 'binarycrossentropy' },
	{ key: 2, text: 'BCE with logits Loss', value: 'bcewithlogits' },
]

export const LOSS_FUNCTION_MULTICLASS = [
	{ key: 2, text: 'NLL Loss', value: 'nll' },
	{ key: 3, text: 'Cross Entropy Loss', value: 'crossentropy' },
]