import { Text, View, TextInput, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { Roboto_400Regular, useFonts } from "@expo-google-fonts/roboto";

import { data } from "@/data/todos";

export default function Index() {
	const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
	const [text, setText] = useState("");
	const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
	const [loaded, error] = useFonts({
		Roboto_400Regular,
	});

	if (!loaded && !error) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	const customFont = "Roboto_400Regular";

  const styles = createStyles(colorScheme);

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
				style={{ fontFamily: customFont }}
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
					style={{ fontFamily: customFont }}
					placeholder="Add a task for the day!"
					placeholderTextColor="gray"
					value={text}
					onChangeText={setText}
				/>
				<Pressable onPress={createTodo} className={styles.addButton}>
					<Text
						className={styles.addButtonText}
						style={{ fontFamily: customFont }}
					>
						Add
					</Text>
				</Pressable>
				<Pressable
					onPress={() =>
						setColorScheme(
							colorScheme === "dark" ? "light" : "dark"
						)
					}
				>
					<Octicons
						name={colorScheme === "dark" ? "sun" : "moon"}
						className="w-9"
						size={30}
						color={theme.text}
						selectable={undefined}
					/>
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

const createStyles = (colorScheme) => {
	return {
		container: `flex-1 ${colorScheme === "dark" ? "bg-black" : "bg-white"}`,
		inputContainer:
			"flex-row gap-2 items-center mb-3 p-3 w-full max-w-[1024px] mx-auto pointer-events-auto",
		input: `flex-1 p-4 rounded-lg bg-gray-800 text-xl ${colorScheme === "dark" ? "text-white" : "text-black"}`,
		addButton: `px-6 py-4 ${colorScheme === "dark" ? "bg-blue-300" : "bg-blue-500"} rounded-lg`,
		addButtonText: `${colorScheme === "dark" ? "text-black" : "text-white"} text-xl font-semibold`,
		todoItem:
			"flex-row items-center justify-between gap-4 px-4 py-3 border-b border-gray-800 w-full max-w-[1024px] mx-auto pointer-events-auto",
		todoText: `flex-1 text-xl ${colorScheme === "dark" ? "text-white" : "text-black"}`,
		completedText: `line-through text-gray-400`,
	};
};
