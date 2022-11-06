<template>
	<div>
		<h1>Страница с постами</h1>
		<my-input
			v-model="searchQuery"
			placeholder = "Поиск..."
			v-focus
		/>
		<div class="app__btns">
			<my-button
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
		/>
		</my-dialog>
	
		<PostList 
			:posts="sortedAndSearchedPosts"
			v-if="!isPostLoading"
		/>
		<div v-else>Loading...</div>
 



	</div>
</template>


<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from 'axios'
import MySelect from "@/components/UI/MySelect.vue";
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import {ref} from 'vue'
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";
export default{ 
	components:{
		PostForm, PostList, MySelect
	},
	data(){
		return{
			dialogVisible: false,
			sortOptions: [
				{value: 'title', name: 'По названию'},
				{value: 'body', name: 'По описанию'},
				{value: 'id', name: 'По ID'},
			]
		}
	},
    setup(props){
       const {posts, totalPages, isPostLoading}	= usePosts(10);
	   const {sortedPosts, selectedSort} = useSortedPosts(posts);
	   const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
        return {
            posts,
            totalPages,
			sortedPosts,
			isPostLoading,
			selectedSort,
			searchQuery,
			sortedAndSearchedPosts,
        }
    }
	
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
