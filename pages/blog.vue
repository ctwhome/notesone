<template>
  <div class="">
    <main-header />
    <AppSearchInput class="ml-8 p-2" />
    <nuxt-link to="/article">
      <div ref="wrapper" class="city paris">
        <img ref="img" width="300" src="@/assets/img/paris.jpg" alt="paris">
      </div>
    </nuxt-link>
    <h1 class="font-bold text-4xl">
      Blog Posts
    </h1>
    <ul v-if="articles" class="flex flex-wrap">
      <li
        v-for="article of articles"
        :key="article.slug"
        class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12"
      >
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          class="flex transition-shadow duration-150 ease-in-out shadow hover:shadow-xl xxlmax:flex-col bg-base-100  text-base-content"
        >
          <img
            v-if="article.img"
            class="w-48 h-48 xxlmax:w-full object-cover"
            :src="article.img"
          >
          <div
            class="p-6 flex flex-col justify-between"
          >
            <h2 class="font-bold">
              {{ article.title }}
            </h2>
            <p>by {{ article.author.name }}</p>
            <p class="font-bold text-gray-600 text-sm">
              {{ article.description }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <h3 class="mb-4 font-bold text-2xl uppercase text-center">
      Topics
    </h3>
    <ul class="flex flex-wrap mb-4 text-center">
      <li
        v-for="tag of tags"
        :key="tag.slug"
        class="xs:w-full md:w-1/3 lg:flex-1 px-2 text-center"
      >
        <NuxtLink :to="`/blog/tag/${tag.slug}`" class="">
          <p
            class="font-bold text-gray-600 uppercase tracking-wider font-medium text-ss"
          >
            {{ tag.name }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch()
    const tags = await $content('tags', params.slug)
      .only(['name', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
      tags
    }
  }
}
</script>
