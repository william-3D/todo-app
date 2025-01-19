import { Text, View, TextInput, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

import { data } from "@/data/todos";

export default function Index() {
	const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
	const [text, setText] = useState("");

	const createTodo = () => {
		if (text.trim()) {
			const newId = todos.length > 0 ? todos[0].id + 1 : 1;
			setTodos([{ id: newId, title: text, completed: false }, ...todos]);
			setText("");
		}
	};

	const toggleCompleteStatus = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const deleteTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const renderItem = ({ item }) => (
		<View className={styles.todoItem}>
			<Text
				className={`${styles.todoText} ${
					item.completed ? styles.completedText : ""
				}`}
				onPress={() => toggleCompleteStatus(item.id)}
			>
				{item.title}
			</Text>
			<Pressable onPress={() => deleteTodo(item.id)}>
				<AntDesign
					name="delete"
					size={24}
					color="red"
					selectable={undefined}
				/>
			</Pressable>
		</View>
	);

	return (
		<SafeAreaView className={styles.container}>
			<View className={styles.inputContainer}>
				<TextInput
					className={styles.input}
					placeholder="Add a task for the day!"
					placeholderTextColor="gray"
					value={text}
					onChangeText={setText}
				/>
				<Pressable onPress={createTodo} className={styles.addButton}>
					<Text className={styles.addButtonText}>Add</Text>
				</Pressable>
			</View>

			<FlatList
				data={todos}
				renderItem={renderItem}
				keyExtractor={(todo) => todo.id.toString()}
				contentContainerStyle={{ flexGrow: 1 }}
			/>
		</SafeAreaView>
	);
}

const styles = {
	container: "flex-1 bg-black",
	inputContainer:
		"flex-row items-center mb-3 p-3 w-full max-w-[1024px] mx-auto pointer-events-auto",
	input: "flex-1 mr-3 p-4 rounded-lg bg-gray-800 text-xl text-white",
	addButton: "px-6 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg",
	addButtonText: "text-white text-xl font-semibold",
	todoItem:
		"flex-row items-center justify-between gap-4 px-4 py-3 border-b border-gray-800 w-full max-w-[1024px] mx-auto pointer-events-auto",
	todoText: "flex-1 text-xl text-white",
  // text colors need to be in a format the native platforms can understand. Another alternative to text-gray-500 would be text-[rgb(107,114,128)]
	completedText: "line-through text-gray-300/[.5]",
};
