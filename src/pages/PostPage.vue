<template>
	<div>
		<h1>Страница с постами</h1>
		<my-input
				v-model="searchQuery"
				placeholder = "Поиск..."

		/>
		<div class="app__btns">
			<my-button
				@click="showDialog"
			>
					Создать пост
			</my-button>
			<my-select	
				v-model="selectedSort"
				:options = "sortOptions"
			/>
		</div>
		<my-dialog v-model:show="dialogVisible">
			<PostForm
			@create="createPost"
		/>
		</my-dialog>
	
		<PostList 
			:posts="sortedAndSearchedPosts"
			@remove="removePost"
			v-if="!isPostLoading"
		/>
		<div v-else>Loading...</div>
		<div v-intersection="loadMorePosts" class="observer"></div>



		<!-- <div class="page__wrapper">
			<div 
				v-for = "pageNumber in totalPages" 
				:key="pageNumber"
				class="page"
				:class="{
					'current-page': page === pageNumber
				}"
				@click ="changePage(pageNumber)"
			> 
				{{pageNumber}}
			</div>
		</div> -->
	</div>
</template>


<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from 'axios'
import MySelect from "@/components/UI/MySelect.vue";

export default{
	components:{
		PostForm, PostList, MySelect
	},
	data(){
		return{
			posts: [],
			dialogVisible:false,
			isPostLoading: false,
			searchQuery: '',
			selectedSort: '',
			page: 1,
			limit: 10,
			totalPages: 0,
			sortOptions: [
				{value: 'title', name: 'По названию'},
				{value: 'body', name: 'По описанию'},
				{value: 'id', name: 'По ID'},
			]
		}
	},
	methods:{
		createPost(post){
		
			this.posts.push(post);
			this.dialogVisible = false;
		
		},
		removePost(post){
			this.posts = this.posts.filter(p => p.id !== post.id)
		},
		showDialog(){	
			this.dialogVisible = true;
		},
		// changePage(pageNumber){
		// 	this.page = pageNumber
			
		// },
		async fetchPosts(){
			// первоначальная загрузка постов с сервера
			try{
				this.isPostLoading = true;
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
					params: {
						_page: this.page,
						_limit: this.limit
					}
				});
				this.totalPages= Math.ceil(response.headers['x-total-count'] / this.limit)
				this.posts = response.data;
			} catch(e){
				alert('Error')
			} finally {
				this.isPostLoading = false;
			}
		},
		async loadMorePosts(){
			//Создание подгрузки постов в ленте  дальше функция используется в mounted
			try{
				this.page +=1; 
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
					params: {
						_page: this.page,
						_limit: this.limit
					}
				});
				this.totalPages= Math.ceil(response.headers['x-total-count'] / this.limit)
				this.posts = [...this.posts,...response.data];
			} catch(e){
				alert('Error')
			} finally {
			}
		}
	},
	mounted(){
		//Intersection Observer API отслеживание завершения скрола по блоку страницы page(10 постов)
		this.fetchPosts();
	},
	computed:{
		sortedPosts(){
			return [...this.posts].sort((post1,post2) => {
				if(this.selectedSort === 'title' || this.selectedSort === 'body'){
				return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
				} else{
					post1[this.selectedSort]- post2[this.selectedSort]
				}
			})
		},
		sortedAndSearchedPosts(){
			return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
		}
		
	},
	watch: {
		// page() {
		// 	this.fetchPosts();
		// }
	},
}

</script>

 
<style scoped>

	.app__btns{
		display: flex;
		justify-content: space-between;
		margin-top:10px;
		margin-bottom:10px
	}
	.page__wrapper{
		display:flex;
		margin-top: 15px;
	}
	.page{
		border: 1px solid black;
		padding: 10px;
	}
	.current-page{
		border: 2px solid teal
	}

	
	
</style>
