<template>
  <section class="pt-lg-3 benefitBg">
    <div class="container">
      <article>
        <Banner></Banner>
        <!-- v-if="categoryId && listBrands.length > 0 && propertyFilter.length > 0" -->
        <div class="d-none d-lg-block" id="appScroll">
          <ol
            class="breadcrumb mb-3"
            v-if="breadcrumb && breadcrumb.length > 0"
          >
            <li
              v-for="(item, index) in breadcrumb"
              :key="index"
              :class="['breadcrumb-item d-flex', item.active ? 'active' : null]"
            >
              <div v-if="item.active" v-html="item.text"></div>
              <b-link v-else :to="'/' + item.link" v-html="item.text"></b-link>
            </li>
            <slot></slot>
          </ol>
          <content-placeholders class="breadcrumb-placeholder mb-3 mt-3" v-else>
            <content-placeholders-text :lines="1" />
          </content-placeholders>
        </div>
        <!-- :class="{ boxFiterLoading: isLoadingCategory }" -->

        <client-only>
          <div class="boxFilter pb-lg-5">
            <div
              v-if="$device.isDesktop"
              class="navigationFilter position-relative d-none d-lg-block"
            >
              <div class="d-flex">
                <div v-if="isShowFirst" class="wrapperNavigationFilter">
                  <b-dropdown
                    class="mb-1"
                    :menu-class="{
                      'scrollbar dropdownHeight':
                        objFirstProperty.value.length >= 10
                    }"
                    id="dropdown-1"
                    :text="objFirstProperty.name"
                  >
                    <b-form-group>
                      <b-form-radio-group
                        @input="handleSub()"
                        @change="isSubBrand = false"
                        v-model="firstId"
                        :options="objFirstProperty.value"
                        value-field="name"
                        text-field="name"
                      >
                        <template v-slot:first>
                          <b-form-radio value="all">Tất cả</b-form-radio>
                        </template>
                      </b-form-radio-group>
                    </b-form-group>
                  </b-dropdown>
                  <p class="font-weight-bold">
                    {{ firstId != "all" ? this.firstTextActive : "Tất cả" }}
                  </p>
                </div>
                <div
                  class="wrapperNavigationFilter"
                  v-if="subCategories && subCategories.length > 0"
                >
                  <b-dropdown
                    class="mb-1"
                    :menu-class="{
                      'scrollbar dropdownHeight': subCategories.length >= 10
                    }"
                    id="dropdown-1"
                    text="Loại bỉm"
                  >
                    <b-form-group>
                      <b-form-radio-group
                        v-model="subCategoryId"
                        @input="handleSub()"
                        :options="subCategories"
                        value-field="id"
                        text-field="name"
                      >
                        <template v-slot:first>
                          <b-form-radio value="0">Tất cả</b-form-radio>
                        </template>
                      </b-form-radio-group>
                    </b-form-group>
                  </b-dropdown>
                  <p class="font-weight-bold">
                    {{
                      subCategoryId != 0 ? this.subCategoryTextActive : "Tất cả"
                    }}
                  </p>
                </div>
                <div
                  class="wrapperNavigationFilter"
                  v-if="listBrands && listBrands.length > 0"
                >
                  <b-dropdown
                    class="mb-1"
                    :menu-class="{
                      'scrollbar dropdownHeight': listBrands.length >= 10
                    }"
                    id="dropdown-1"
                    text="Thương hiệu"
                  >
                    <b-form-group>
                      <b-form-radio-group
                        @input="handleSub()"
                        @change="isSubBrand = false"
                        v-model="brandId"
                        :options="listBrands"
                        value-field="id"
                        text-field="name"
                      >
                        <template v-slot:first>
                          <b-form-radio value="0">Tất cả</b-form-radio>
                        </template>
                      </b-form-radio-group>
                    </b-form-group>
                  </b-dropdown>
                  <p class="font-weight-bold">
                    {{ brandId == 0 ? "Tất cả" : this.brandTextActive }}
                  </p>
                </div>
                <div
                  class="wrapperNavigationFilter"
                  v-if="Object.values(this.listSubBrand)[0]"
                >
                  <b-dropdown
                    class="mb-1"
                    :menu-class="{
                      'scrollbar dropdownHeight': listItemSubBrands.length >= 10
                    }"
                    id="dropdown-1"
                    text="Nhãn hàng"
                  >
                    <b-form-group>
                      <b-form-radio-group
                        @input="handleSubBrand()"
                        v-model="subBrandId"
                        :options="listItemSubBrands"
                        value-field="id"
                        text-field="name"
                      >
                        <template v-slot:first>
                          <b-form-radio value="0">Tất cả</b-form-radio>
                        </template>
                      </b-form-radio-group>
                    </b-form-group>
                  </b-dropdown>
                  <p class="font-weight-bold">
                    {{ subBrandId == 0 ? "Tất cả" : this.subBrandTextActive }}
                  </p>
                </div>
                <div
                  class="d-flex"
                  v-for="(item, index) in propertyFilter"
                  :key="'property' + index"
                >
                  <div class="wrapperNavigationFilter wrapperProperty">
                    <b-dropdown
                      class="mb-1"
                      :menu-class="{
                        'scrollbar dropdownHeight': item.value.length >= 10
                      }"
                      :text="item.name"
                    >
                      <b-form-group>
                        <b-form-radio-group
                          @input="handleProperty(item.id, index)"
                          v-model="listProperty[item.id]"
                          :options="item.value"
                          value-field="id"
                          text-field="name"
                        >
                          <template v-slot:first>
                            <b-form-radio value="null">Tất cả</b-form-radio>
                          </template>
                        </b-form-radio-group>
                      </b-form-group>
                    </b-dropdown>
                    <p class="font-weight-bold">
                      {{
                        propertyTextActive[item.id]
                          ? propertyTextActive[item.id]
                          : "Tất cả"
                      }}
                    </p>
                  </div>
                </div>
                <div
                  class="wrapperNavigationFilter"
                  v-if="amountData && amountData.length > 0"
                >
                  <b-dropdown
                    class="mb-1"
                    :menu-class="{
                      'scrollbar dropdownHeight': amountData.length >= 10
                    }"
                    id="dropdown-1"
                    text="Số lượng"
                  >
                    <b-form-group>
                      <b-form-radio-group
                        @input="inputAmountFilter()"
                        v-model="amountString"
                        :options="amountData"
                        value-field="name"
                        text-field="name"
                      >
                        <template v-slot:first>
                          <b-form-radio value="all">Tất cả</b-form-radio>
                        </template>
                      </b-form-radio-group>
                    </b-form-group>
                  </b-dropdown>
                  <p class="font-weight-bold">
                    {{
                      amountString != "all" ? this.amountTextActive : "Tất cả"
                    }}
                  </p>
                </div>
                <div>
                  <div
                    v-if="
                      isHasCombo &&
                        brandId > 0 &&
                        Object.values(this.listProperty)[0] &&
                        (subCategoryId > 0 || firstId != 'all')
                    "
                  >
                    <div class="combo">
                      <b-form-checkbox
                        value="1"
                        unchecked-value="0"
                        @input="handleCombo"
                        v-model="isCombo"
                        >Combo giá tốt</b-form-checkbox
                      >
                      <img
                        src="../../assets/img/icon/icon_combo.svg"
                        alt="Combo giá tốt"
                        width="32"
                        height="30"
                      />
                    </div>
                  </div>
                </div>
                <div class="wrapperNavigationFilter ml-auto">
                  <b-dropdown
                    class="sortDropdown mb-1"
                    right
                    id="dropdown-1"
                    text="Sắp xếp"
                    v-model="sort.sortType"
                    @input="filter()"
                  >
                    <b-dropdown-item
                      :link-class="{
                        'font-weight-bold': sort.sortText == item.text,
                        sortPadding: true
                      }"
                      v-for="(item, index) in optionSort"
                      :key="index"
                      @click="handleSort(item)"
                      >{{ item.text }}</b-dropdown-item
                    >
                  </b-dropdown>
                  <p class="font-weight-bold">{{ sort.sortText }}</p>
                </div>
              </div>
            </div>
            <!-- this.brandId = 0;
      this.firstId = "all";
      this.subBrandId = 0;
      this.selectedVendor.splice(0, this.subBrandId.length);
      this.amountString = "all";
      this.isCombo = 0;
      this.subCategoryId = 0;
      for (const [index, i] of Object.keys(this.listProperty).entries()) {
        this.listProperty[i] = null;
          }-->
            <div class="boxFilterMobile d-block d-lg-none mt-10-res">
              <div
                class="d-flex align-items-center navigationFilter position-relative"
              >
                <div class="text-uppercase pl-2">
                  <a
                    @click="mobileFilterPopup = true"
                    class="pointer d-flex align-items-center"
                  >
                    <img
                      src="../../assets/img/icon/icon_filter.svg"
                      class="mr-2"
                      width="17"
                      height="17"
                    />
                    <p
                      class="activeIcon"
                      v-if="
                        firstId != 'all' ||
                          brandId != 0 ||
                          subBrandId != 0 ||
                          subCategoryId != 0 ||
                          isCombo != 0 ||
                          amountString != 'all' ||
                          Object.values(this.listProperty)[0]
                      "
                    ></p>
                    Lọc
                  </a>
                </div>
                <b-dropdown
                  right
                  class="ml-auto sortDropdown"
                  id="dropdown-1"
                  text="Sắp xếp"
                  v-model="sort.sortType"
                  @input="filter()"
                >
                  <b-dropdown-item
                    :link-class="{
                      'font-weight-bold': sort.sortText == item.text,
                      sortPadding: true
                    }"
                    v-for="(item, index) in optionSort"
                    :key="'sort' + index"
                    @click="handleSort(item)"
                    >{{ item.text }}</b-dropdown-item
                  >
                </b-dropdown>
              </div>
            </div>
            <div
              class="filterVendor mt-lg-4 mt-3"
              v-if="vendorFilters && vendorFilters.length > 0"
            >
              <div>
                <h6 class="font-weight-normal mb-2">
                  Xem sản phẩm theo kênh mua sắm
                </h6>
                <!-- <div
                class="rowVendorFilters mx-2-minus mx-5px-minus"
              >
                <div
                  class="col-lg-2 px-lg-2 px-5-res col-custom"
                  v-for="(item, index) in 6"
                  :key="index"
                >
                  <content-placeholders :rounded="true">
                    <content-placeholders-img class="placeholder-vendor" />
                  </content-placeholders>
                </div>
              </div>-->
                <VendorToggle
                  @change="onChangeVendorFilter($event)"
                  :options="vendorFilters"
                  :selected="selectedVendor"
                />
              </div>
            </div>
            <div v-if="$device.isDesktop" class="d-none d-lg-block">
              <div class="d-flex w-100">
                <div class="w-100">
                  <p class="mb-1 mt-lg-2 mt-3">
                    Tìm thấy
                    <span class="font-weight-bold">
                      {{ formatNumber(totalPage) }}
                    </span>
                    sản phẩm
                  </p>
                  <!-- <p v-else class="mb-1 mt-lg-4 mt-3">Chưa có sản phẩm</p> -->
                  <div
                    v-if="isLoadingCategory"
                    class="row mx-2-minus mx-5px-minus product-best-row"
                  >
                    <div
                      class="col-lg-3 col-6 px-5-res px-lg-2"
                      v-for="(item, index) in 20"
                      :key="index"
                    >
                      <content-placeholders
                        :rounded="true"
                        centered
                        class="placeholder-box-product"
                      >
                        <content-placeholders-img />
                        <content-placeholders-text class="title" :lines="1" />
                        <content-placeholders-text class="title1" :lines="1" />
                        <content-placeholders-text class="title2" :lines="1" />
                        <content-placeholders-text
                          class="mt-lg-4 title3"
                          :lines="1"
                        />
                        <content-placeholders-text class="title4" :lines="1" />
                        <content-placeholders-text class="title5" :lines="1" />
                      </content-placeholders>
                    </div>
                  </div>
                  <div v-else>
                    <div>
                      <div class="row mx-2-minus mx-5px-minus">
                        <div
                          class="col-lg-3 col-6 px-5-res px-lg-2"
                          v-for="(item, index) in productFilters"
                          :key="index"
                        >
                          <BoxProductFilter
                            v-if="item.target_url"
                            :products="item"
                            :isCheckBestPrice="isCheckBestPrice"
                          ></BoxProductFilter>
                          <BoxProduct
                            v-else
                            :products="item"
                            :isCheckBestPrice="isCheckBestPrice"
                          ></BoxProduct>
                        </div>
                      </div>
                      <div class="d-none d-lg-block" v-if="totalPage > 0">
                        <div class="d-flex justify-content-end mt-lg-3">
                          <a @click="scrollBehavior()">
                            <b-pagination
                              class="custom-pagination"
                              v-model="pagination.currenPage"
                              :total-rows="totalPage"
                              :per-page="pagination.pageSize"
                              @input="filter(pagination.currenPage)"
                              size="sm"
                              last-number
                              first-number
                            ></b-pagination>
                          </a>
                        </div>
                      </div>
                    </div>
                    <!-- <div v-else class="mt-lg-5 text-center">
                    <p>Chưa có sản phẩm</p>
                  </div>-->
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="$device.isMobile"
              class="d-block d-lg-none"
              id="appScroll"
            >
              <div class="d-flex w-100">
                <div class="w-100">
                  <p v-if="totalPage > 0" class="mb-1 mt-lg-4 mt-3">
                    Tìm thấy
                    <span class="font-weight-bold">
                      {{ formatNumber(totalPage) }}
                    </span>
                    sản phẩm
                  </p>
                  <div>
                    <div class="row mx-2-minus mx-5px-minus mb-lg-5 mb-3">
                      <div
                        class="d-flex justify-content-center w-100 mt-3 text-center"
                        v-if="isLoadingProductMobile"
                      >
                        <div class="lds-ring">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                      <div
                        v-else
                        class="col-lg-3 col-6 px-5-res px-lg-2"
                        v-for="(item, index) in productFilters"
                        :key="index"
                      >
                        <BoxProductFilter
                          v-if="item.target_url"
                          :products="item"
                          :isCheckBestPrice="isCheckBestPrice"
                        ></BoxProductFilter>
                        <!-- <BoxProduct v-else :products="item" :isCheckBestPrice="isCheckBestPrice"></BoxProduct> -->
                      </div>
                    </div>
                    <div
                      class="d-block d-lg-none"
                      v-if="!isLoadingProductMobile"
                    >
                      <div
                        class="d-flex justify-content-center mb-3"
                        v-if="isLoadingCategoryProductMobile"
                      >
                        <div class="lds-ring">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                      <div v-else>
                        <button
                          v-if="productFilters.length < totalPage"
                          type="submit"
                          @click.prevent="handlePagination()"
                          class="btn w-100 text-uppercase font-weight-bold rounded btnSearchReverse btn-secondary mb-4"
                        >
                          Xem thêm
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-if="!isLoadingProductMobile">
                    <div
                      v-if="totalPage == 0"
                      class="mt-lg-5 mt-3 mb-4 text-center"
                    >
                      <p>Chưa có sản phẩm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </client-only>
      </article>
      <aside>
        <vendor-best></vendor-best>
      </aside>
    </div>
    <b-modal
      v-if="$device.isMobile"
      v-model="mobileFilterPopup"
      :content-class="{ overLoadings: isLoadingCategory }"
      :body-class="{ 'pointer-none ': isLoadingCategory }"
      modal-class="login-modal popupFilter d-block d-lg-none"
    >
      <template v-slot:modal-title>
        <p class="text-uppercase">Lọc sản phẩm</p>
      </template>
      <div class="popupFilterContent">
        <div
          v-if="
            isHasCombo &&
              brandId > 0 &&
              Object.values(this.listProperty)[0] &&
              (subCategoryId > 0 || firstId != 'all')
          "
          class="commoMobile mt-3 mb-1"
        >
          <p class="title">Loại sản phẩm</p>
          <div class="row">
            <div class="col-6 mt-1">
              <b-form-checkbox
                value="1"
                unchecked-value="0"
                @input="handleCombo"
                v-model="isCombo"
                class="radioCombo"
                button
                button-variant="primary"
                >Combo giá tốt</b-form-checkbox
              >
            </div>
          </div>
        </div>
        <!-- <b-dropdown
                  class="mb-1"
                  :menu-class="{
                    'scrollbar dropdownHeight':
                      objFirstProperty.value.length >= 10,
                  }"
                  id="dropdown-1"
                  :text="objFirstProperty.name"
                >
                  <b-form-group>
                    <b-form-radio-group
                      @input="handleSub()"
                      @change="isSubBrand = false"
                      v-model="firstId"
                      :options="objFirstProperty.value"
                      value-field="name"
                      text-field="name"
                    >
                      <template v-slot:first>
                        <b-form-radio value="all">Tất cả</b-form-radio>
                      </template>
                    </b-form-radio-group>
                  </b-form-group>
        </b-dropdown>-->
        <div v-if="isShowFirst">
          <b-form-group class="mt-3 mb-1" :label="objFirstProperty.name">
            <div
              class="growAll"
              :class="
                objFirstProperty.value && objFirstProperty.value.length > 6
                  ? 'growAllHeight'
                  : ''
              "
              id="grow-2"
            >
              <div class="sub-2">
                <b-form-group>
                  <b-form-radio-group
                    class="custom-radio-local custom-radio-local-mobile"
                    @input="handleSub()"
                    @change="isSubBrand = false"
                    v-model="firstId"
                    :options="objFirstProperty.value"
                    buttons
                    button-variant="primary"
                    value-field="name"
                    text-field="name"
                  >
                    <template v-slot:first>
                      <b-form-radio value="all">Tất cả</b-form-radio>
                    </template>
                  </b-form-radio-group>
                </b-form-group>
                <!-- <b-form-checkbox-group
                  class="custom-radio-local custom-radio-local-mobile"
                  @input="handleSub()"
                  v-model="firstId"
                  buttons
                  button-variant="primary"
                >
                  <b-form-checkbox
                    @change="handleFirstProperty(option.id,option.name,objFirstProperty.id)"
                    :value="option.id"
                    :key="option.id"
                    inline
                    v-for="option in objFirstProperty.value"
                  >
                    <span>{{option.name}}</span>
                  </b-form-checkbox>
                </b-form-checkbox-group>-->
              </div>
            </div>
          </b-form-group>
          <div
            class="text-center"
            v-show="objFirstProperty.value && objFirstProperty.value.length > 6"
          >
            <div class="btnMoreReadContent" id="icon-button-2">
              <input
                type="button"
                class="btn btnMoreRead w-100"
                id="more-button-2"
                value="Xem thêm"
                @click.prevent="
                  growDivReverse(
                    'grow-2',
                    'sub-2',
                    'more-button-2',
                    138,
                    'icon-button-2'
                  )
                "
              />
            </div>
          </div>
        </div>
        <div v-if="subCategories && subCategories.length > 0">
          <b-form-group class="mt-3 mb-1" label="Loại bỉm">
            <div
              class="growAll"
              :class="
                subCategories && subCategories.length > 6 ? 'growAllHeight' : ''
              "
              id="grow-subMobile-3"
            >
              <div class="sub-subMobile-3">
                <b-form-group>
                  <b-form-radio-group
                    class="custom-radio-local custom-radio-local-mobile"
                    v-model="subCategoryId"
                    @input="handleSub()"
                    :options="subCategories"
                    value-field="id"
                    text-field="name"
                    buttons
                    button-variant="primary"
                  >
                    <template v-slot:first>
                      <b-form-radio value="0">Tất cả</b-form-radio>
                    </template>
                  </b-form-radio-group>
                </b-form-group>
                <!-- <b-form-checkbox-group
                  class="custom-radio-local custom-radio-local-mobile"
                  v-model="subCategoryId"
                  buttons
                  button-variant="primary"
                >
                  <b-form-checkbox
                    @change="handleSubCategory(option.id,option.name)"
                    :value="option.id"
                    :key="option.id"
                    inline
                    v-for="option in subCategories"
                  >{{option.name}}</b-form-checkbox>
                </b-form-checkbox-group>-->
              </div>
            </div>
          </b-form-group>
        </div>
        <b-form-group class="mt-3 mb-1" label="Thương hiệu">
          <div
            class="growAll"
            :class="listBrands && listBrands.length > 6 ? 'growAllHeight' : ''"
            id="grow-3"
          >
            <div class="sub-3">
              <b-form-group>
                <b-form-radio-group
                  class="custom-radio-local custom-radio-local-mobile"
                  @input="handleSub()"
                  @change="isSubBrand = false"
                  v-model="brandId"
                  :options="listBrands"
                  value-field="id"
                  text-field="name"
                  buttons
                  button-variant="primary"
                >
                  <template v-slot:first>
                    <b-form-radio value="0">Tất cả</b-form-radio>
                  </template>
                </b-form-radio-group>
              </b-form-group>
              <!-- <b-form-checkbox-group
                class="custom-radio-local custom-radio-local-mobile"
                @input="handleSub()"
                v-model="brandId"
                buttons
                button-variant="primary"
              >
                <b-form-checkbox
                  @change="handleBrand(option.id,option.name)"
                  :value="option.id"
                  :key="option.id"
                  inline
                  v-for="option in listBrands"
                >{{option.name}}</b-form-checkbox>
              </b-form-checkbox-group>-->
            </div>
          </div>
        </b-form-group>
        <div class="text-center" v-show="listBrands && listBrands.length > 6">
          <div class="btnMoreReadContent" id="icon-button-3">
            <input
              type="button"
              class="btn btnMoreRead w-100"
              id="more-button-3"
              value="Xem thêm"
              @click.prevent="
                growDivReverse(
                  'grow-3',
                  'sub-3',
                  'more-button-3',
                  138,
                  'icon-button-3'
                )
              "
            />
          </div>
        </div>
        <div v-if="Object.values(this.listSubBrand)[0]">
          <div>
            <b-form-group class="mt-3 mb-1" label="Nhãn hàng">
              <div
                class="growAll"
                :class="
                  listItemSubBrands && listItemSubBrands.length > 6
                    ? 'growAllHeight'
                    : ''
                "
                id="grow-4"
              >
                <div class="sub-4">
                  <b-form-group>
                    <b-form-radio-group
                      class="custom-radio-local custom-radio-local-mobile"
                      @input="handleSubBrand()"
                      v-model="subBrandId"
                      :options="listItemSubBrands"
                      value-field="id"
                      text-field="name"
                      buttons
                      button-variant="primary"
                    >
                      <template v-slot:first>
                        <b-form-radio value="0">Tất cả</b-form-radio>
                      </template>
                    </b-form-radio-group>
                  </b-form-group>
                  <!-- <b-form-checkbox-group
                    class="custom-radio-local custom-radio-local-mobile"
                    @input="filter()"
                    v-model="subBrandId"
                    :options="listSubBrand"
                    value-field="id"
                    text-field="name"
                    name="buttons-1"
                    buttons
                    button-variant="primary"
                  ></b-form-checkbox-group>-->
                </div>
              </div>
            </b-form-group>
          </div>
          <div
            class="text-center"
            v-show="listItemSubBrands && listItemSubBrands.length > 6"
          >
            <div class="btnMoreReadContent" id="icon-button-4">
              <input
                type="button"
                class="btn btnMoreRead w-100"
                id="more-button-4"
                value="Xem thêm"
                @click.prevent="
                  growDivReverse(
                    'grow-4',
                    'sub-4',
                    'more-button-4',
                    138,
                    'icon-button-4'
                  )
                "
              />
            </div>
          </div>
        </div>
        <div
          v-for="(item, index) in propertyFilter"
          :key="'propertyMobile' + index"
        >
          <b-form-group class="mt-3 mb-1" :label="item.name">
            <div
              class="growAll"
              :class="
                item.value && item.value.length > 6 ? 'growAllHeight' : ''
              "
              :id="`grows-${item.id}`"
            >
              <div :class="`subs-${item.id}`">
                <b-form-group>
                  <b-form-radio-group
                    class="custom-radio-local custom-radio-local-mobile"
                    @input="handleProperty(item.id, index)"
                    v-model="listProperty[item.id]"
                    :options="item.value"
                    value-field="id"
                    text-field="name"
                    buttons
                    button-variant="primary"
                  >
                    <template v-slot:first>
                      <b-form-radio value="null">Tất cả</b-form-radio>
                    </template>
                  </b-form-radio-group>
                </b-form-group>
                <!-- <b-form-checkbox-group
                  value-field="id"
                  text-field="name"
                  class="custom-radio-local custom-radio-local-mobile"
                  :options="item.value"
                  @input="handleProperty()"
                  v-model="listProperty[item.id]"
                  buttons
                  button-variant="primary"
                ></b-form-checkbox-group>-->
              </div>
            </div>
          </b-form-group>
          <div class="text-center" v-show="item.value && item.value.length > 6">
            <div class="btnMoreReadContent" :id="`icon-button-${item.id}`">
              <input
                type="button"
                class="btn btnMoreRead w-100"
                :id="`more-buttons-${item.id}`"
                value="Xem thêm"
                @click.prevent="
                  growDivReverse(
                    `grows-${item.id}`,
                    `subs-${item.id}`,
                    `more-buttons-${item.id}`,
                    138,
                    `icon-button-${item.id}`
                  )
                "
              />
            </div>
          </div>
        </div>
        <div v-if="amountData && amountData.length > 0">
          <div>
            <b-form-group class="mt-3 mb-1" label="Số lượng">
              <div
                class="growAll"
                :class="amountData.length > 6 ? 'growAllHeight' : ''"
                id="grow-5"
              >
                <div class="sub-5">
                  <b-form-group>
                    <!-- <b-form-group>
                    <b-form-radio-group
                      @input="inputAmountFilter()"
                      v-model="amountString"
                      :options="amountData"
                      value-field="name"
                      text-field="name"
                    >
                      <template v-slot:first>
                        <b-form-radio value="all">Tất cả</b-form-radio>
                      </template>
                    </b-form-radio-group>
                    </b-form-group>-->
                    <b-form-radio-group
                      class="custom-radio-local custom-radio-local-mobile"
                      @input="inputAmountFilter()"
                      v-model="amountString"
                      :options="amountData"
                      value-field="name"
                      text-field="name"
                      buttons
                      button-variant="primary"
                    >
                      <template v-slot:first>
                        <b-form-radio value="all">Tất cả</b-form-radio>
                      </template>
                    </b-form-radio-group>
                  </b-form-group>
                  <!-- <b-form-checkbox-group
                    class="custom-radio-local custom-radio-local-mobile"
                    @input="filter()"
                    v-model="subBrandId"
                    :options="listSubBrand"
                    value-field="id"
                    text-field="name"
                    name="buttons-1"
                    buttons
                    button-variant="primary"
                  ></b-form-checkbox-group>-->
                </div>
              </div>
            </b-form-group>
          </div>
          <div class="text-center" v-show="amountData && amountData.length > 6">
            <div class="btnMoreReadContent" id="icon-button-5">
              <input
                type="button"
                class="btn btnMoreRead w-100"
                id="more-button-5"
                value="Xem thêm"
                @click.prevent="
                  growDivReverse(
                    'grow-5',
                    'sub-5',
                    'more-button-5',
                    138,
                    'icon-button-5'
                  )
                "
              />
            </div>
          </div>
        </div>
      </div>
      <template v-slot:modal-footer="{ cancel }">
        <div
          class="d-flex flex-column h-100 justify-content-between w-100 mb-4"
        >
          <div
            class="d-flex h-100 justify-content-center align-items-center w-100"
          >
            <p class="mt-2 mb-2">
              Tìm thấy
              <span class="font-weight-bold">{{
                formatNumber(totalPage)
              }}</span>
              sản phẩm
            </p>
          </div>
          <div class="row">
            <div class="col-6">
              <button
                type="submit"
                @click.prevent="removetagFilter"
                class="btn w-100 text-uppercase font-weight-bold py-lg-3 my-lg-3 rounded btnSearchReverse btn-secondary"
              >
                Xóa bộ lọc
              </button>
            </div>
            <div class="col-6">
              <button
                type="submit"
                @click.prevent="cancel()"
                class="btn w-100 text-uppercase font-weight-bold py-lg-3 my-lg-3 rounded btnSearch btn-secondary"
              >
                Xem sản phẩm
              </button>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
  </section>
</template>
<script>
import { getEntityInfo } from "@/misc/helpers";
import Banner from "../../components/products/Banner";
import ProductIndexBest from "../../components/products/ProductIndexBest";
import BoxCategoryProduct from "../../components/BoxCategoryProduct";
import BoxProductFilter from "../../components/BoxProductFilter";
import BoxProduct from "../../components/BoxProduct";
import VendorToggle from "../../components/filters/VendorToggle";
import VendorBest from "../../components/filters/VendorBest";
import _ from "lodash";
import { categoryVendor } from "@/api/mock/index";
// const ProductService = () => import("@/api/product")
import ProductService from "@/api/product";
export default {
  scrollToTop: true,
  components: {
    Banner,
    ProductIndexBest,
    BoxCategoryProduct,
    BoxProductFilter,
    BoxProduct,
    VendorToggle,
    VendorBest
  },
  data() {
    return {
      active: false,
      listProperty: {},
      amountString: "all",
      mobileFilterPopup: false,
      brandId: 0,
      subCategoryId: 0,
      isCheckBestPrice: true,
      isLoadingCategory: false,
      amountData: [],
      isLoadingProductMobile: false,
      isLoadingCategoryProductMobile: false,
      timer: null,
      selected: undefined,
      options: [
        { text: "Or toggle this other custom radio", value: 1 },
        { text: "This one is Disabled", value: 2 },
        { text: "This is the 4th radio", value: 3 }
      ],
      tagFilterProperty: [],
      objSubBrand: {},
      isHasCombo: undefined,
      isCombo: 0,
      subCategories: [],
      listSubBrand: [],
      subBrandId: 0,
      isShowFirst: false,
      firstId: "all",
      objFirstProperty: {},
      vendorFilters: [],
      selectedVendor: [],
      totalPage: 0,
      brandTextActive: "",
      firstTextActive: "",
      subBrandTextActive: "",
      amountTextActive: "",
      subCategoryTextActive: "",
      propertyTextActive: [],
      isSubBrand: false,
      pagination: {
        currenPage: 1,
        pageSize: 12
      },
      products: [],
      productFilters: [],
      sort: {
        sortType: "asc",
        sortText: "Giá tăng dần",
        sortField: "discount"
      },
      optionSort: [
        { value: "asc", text: "Giá tăng dần", type: "discount" },
        { value: "desc", text: "Giá giảm dần", type: "discount" },
        { value: "desc", text: "Tỉ lệ giảm cao", type: "discount_rate" }
        // { value: 'desc', text: 'Giá giảm dần',type:'discount_rate' },
      ],
      arrFilters: [],
      propertyFilter: [],
      categoryLevelSingles: {},
      isLoading: false,
      listBrands: [],
      listItemSubBrands: [],
      categoryId: undefined,
      dataIndex: undefined,
      objAmountFilter: {},
      tagFilterAmount: [],
      breadcrumb: []
    };
  },
  created() {
    const path = this.$route.fullPath;
    this.categoryId = getEntityInfo(path).entityId;
    this.getListCategoriesFilterData();
  },
  mounted() {
    let me = this;
    window.onpopstate = function() {
      me.$router.push("/");
    };
  },

  computed: {},
  methods: {
    inputAmountFilter() {
      if (this.amountString != "all") {
        this.amountTextActive = this.amountString;
      } else {
        this.amountTextActive = "Tất cả";
      }
      this.filter();
    },
    handleAmountData() {
      // this.subCategoryId == 0 &&
      // this.amountString = "all";
      if (
        this.brandId != 0 &&
        this.subCategoryId != 0 &&
        Object.values(this.listProperty)[0] != undefined &&
        this.propertyTextActive[25] != "Tất cả"
      ) {
        this.amountData = this.objAmountFilter[this.brandId][
          this.propertyTextActive[25]
        ][this.subCategoryId];
        if (this.amountData && this.amountData.length > 0) {
          this.amountData = this.amountData.sort(function(a, b) {
            return a.name - b.name;
          });
        }
      } else {
        this.amountData = [];
      }
    },
    async handlePagination() {
      this.pagination.currenPage += 1;
      this.isLoadingCategory = true;
      this.isLoadingCategoryProductMobile = true;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        ProductService.postProductFilter(
          this.$axios,
          this.categoryId,
          this.brandId != 0 ? this.brandId : undefined,
          this.isCombo,
          this.subCategoryId != 0 ? this.subCategoryId : undefined,
          this.subBrandId != 0 ? this.subBrandId : undefined,
          this.arrFilters,
          this.selectedVendor,
          this.sort.sortField,
          this.sort.sortType,
          this.pagination.currenPage,
          this.$device.isDesktop
            ? (this.pagination.pageSize = 40)
            : (this.pagination.pageSize = 20)
        ).then(resp => {
          this.productFilters = this.productFilters.concat(
            resp.data.data.products
          );
          this.totalPage = resp.data.data.total;
          this.isLoadingCategory = false;
          this.isLoadingCategoryProductMobile = false;
        });

        // this.$router.push({ path: this.$route.path, query: { ...query } });
      }, 1000);
    },
    onChangeVendorFilter(event) {
      this.pagination.currenPage = 1;
      this.filter();
    },
    growDivReverse(v1, v2, v3, number, v4) {
      var growDiv = document.getElementById(v1);
      if (growDiv.clientHeight > number) {
        growDiv.style.height = number + "px";
        // growDiv.classList.add("contentSlider")
      } else {
        var wrapper = document.querySelector("." + v2);
        growDiv.style.height = wrapper.clientHeight + "px";
        // growDiv.classList.remove("contentSlider");
      }
      document.getElementById(v3).value =
        document.getElementById(v3).value == "Xem thêm"
          ? "Thu gọn"
          : "Xem thêm";
      document.getElementById(v3).value == "Xem thêm"
        ? document.getElementById(v4).classList.remove("changeMyIcon")
        : document.getElementById(v4).classList.add("changeMyIcon");
    },
    growDiv(v1, v2, v3, number) {
      var growDiv = document.getElementById(v1);
      var wrapper = document.querySelector("." + v2);
      growDiv.style.height = wrapper.clientHeight + "px";
      if (growDiv.clientHeight != number) {
        growDiv.style.height = number + "px";
        growDiv.classList.add("contentSlider");
      } else {
        growDiv.style.height = wrapper.clientHeight + "px";
        growDiv.classList.remove("contentSlider");
      }
      document.getElementById(v3).value =
        document.getElementById(v3).value == "Thu gọn" ? "Xem thêm" : "Thu gọn";
    },
    handleSubBrand() {
      if (this.subBrandId != 0) {
        let subBrand = this.listItemSubBrands.find(
          e => e.id == this.subBrandId
        );
        this.subBrandTextActive = subBrand.name;
      } else {
        this.subCategoryTextActive = "Tất cả";
      }
      this.isCombo = 0;
      this.amountString = "all";
      this.selectedVendor = [];
      this.pagination.currenPage = 1;
      this.filter();
    },
    removetagFilter() {
      this.brandId = 0;
      this.firstId = "all";
      this.subBrandId = 0;
      this.selectedVendor.splice(0, this.subBrandId.length);
      this.amountString = "all";
      this.isCombo = 0;
      this.subCategoryId = 0;
      for (const [index, i] of Object.keys(this.listProperty).entries()) {
        this.listProperty[i] = "";
      }
      // for (var i = 0; i < Object.keys(this.listProperty).length; i++) {
      //   let a = Object.keys(this.listProperty)[i];
      //   this.listProperty[a] = [];
      // }
      this.filter();
    },
    handleSub() {
      this.handleAmountData();
      if (this.brandId != 0) {
        if (this.firstId != "all") {
          let subBrand = this.listSubBrand[this.brandId][this.firstId];
          this.listItemSubBrands = subBrand;
          // if (this.subBrandId == 0) {
          if (!this.isSubBrand) {
            this.subBrandId = 0;
          }
          // }
        }
        let brand = this.listBrands.find(e => e.id == this.brandId);
        this.brandTextActive = brand.name;
      } else {
        this.listItemSubBrands = [];
        this.subBrandId = 0;
        this.brandTextActive = "Tất cả";
      }
      if (this.subCategoryId != 0) {
        let brand = this.subCategories.find(e => e.id == this.subCategoryId);
        this.subCategoryTextActive = brand.name;
      } else {
        this.subCategoryTextActive = "Tất cả";
      }

      if (this.firstId != "all") {
        this.firstTextActive = this.firstId;
      } else {
        this.listItemSubBrands = [];
        this.subBrandId = 0;
        this.firstTextActive = "Tất cả";
      }
      // this.listSubBrand = myArray.filter(
      //   (v, i, a) => a.findIndex(t => t.id === v.id) === i
      // );
      this.isCombo = 0;
      this.amountString = "all";
      this.selectedVendor = [];
      this.pagination.currenPage = 1;
      this.filter();
    },
    // scrollSubBrand(){
    //     document.getElementById('subScroll').scrollIntoView({
    //         behavior: 'smooth',
    //          block :'start'
    //     });
    // },

    handleProperty(idOnClick, indexOnclick) {
      this.tagFilterProperty = [];
      let arr = this.categoryLevelSingles.property;
      if (arr.length == 0) {
        return;
      }
      if (idOnClick != undefined && indexOnclick != undefined) {
        if (
          idOnClick.toString() === Object.keys(this.listProperty)[indexOnclick]
        ) {
          let result = arr.find(e => e.id == idOnClick);
          let objValueProperty = result.value.find(
            p => p.id === Object.values(this.listProperty)[indexOnclick]
          );
          if (objValueProperty) {
            this.propertyTextActive[idOnClick] = objValueProperty.name;
          } else {
            this.propertyTextActive[idOnClick] = "Tất cả";
          }
          this.handleAmountData();
        }
      }
      if (
        this.listProperty[idOnClick] &&
        this.listProperty[idOnClick] != "null"
      ) {
        for (const [index, i] of Object.keys(this.listProperty).entries()) {
          let result = arr.find(e => e.id == i);
          if (result) {
            let value = result.value.find(
              p => p.id == Object.values(this.listProperty)[index]
            );
            if (value) {
              this.tagFilterProperty.push({
                id: parseInt(i),
                value: value.name
              });
            }
          }
        }
      } else {
        if (
          idOnClick.toString() === Object.keys(this.listProperty)[indexOnclick]
        ) {
          this.listProperty[idOnClick] = undefined;
        }
      }
      this.isCombo = 0;
      this.amountString = "all";
      this.selectedVendor = [];
      this.pagination.currenPage = 1;
      this.filter();
    },
    scrollBehavior() {
      document.getElementById("appScroll").scrollIntoView({
        behavior: "smooth"
      });
    },
    handleCombo() {
      this.pagination.currenPage = 1;
      this.filter();
    },
    handleSort(obj) {
      this.sort.sortType = obj.value;
      this.sort.sortText = obj.text;
      this.sort.sortField = obj.type;
      this.pagination.currenPage = 1;
      this.filter();
    },
    hanledProperty(arr) {
      if (arr && arr.length > 0) {
        var found = arr.find(function(element) {
          return element.show_first == 1;
        });
      }

      if (found) {
        this.isShowFirst = true;
        this.objFirstProperty = found;
        this.propertyFilter = arr.filter(item => item.show_first === 0);
      } else {
        this.isShowFirst = false;
        this.propertyFilter = arr;
      }
    },
    async getListAllData(categoryId, axios) {
      const objCategoryFilter = await ProductService.getListCategoriesFilterData(
        this.$axios,
        this.categoryId
      );
      let objAmountFilter = {};
      if (categoryId == categoryVendor.me_va_be) {
        const { data } = await ProductService.getCategoriesAmountFilter(
          axios,
          categoryVendor.me_va_be
        );
        objAmountFilter = data;
      }
      const objSubBrand = await ProductService.getSubBrandFilter(
        axios,
        categoryId
      );
      return {
        listCategoryFilter: objCategoryFilter.data,
        objAmountFilter: objAmountFilter.data,
        listSubBrand: objSubBrand.data
      };
    },
    handleSortBrand(brand) {
      return brand.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
    async getListCategoriesFilterData() {
      this.isLoadingProductMobile = true;
      this.isLoadingCategory = true;
      this.isLoading = true;

      let {
        listCategoryFilter,
        objAmountFilter,
        listSubBrand
      } = await this.getListAllData(this.categoryId, this.$axios);
      await this.hanledProperty(
        listCategoryFilter &&
          listCategoryFilter.data &&
          listCategoryFilter.data.property
      );
      this.objAmountFilter = objAmountFilter;
      this.listSubBrand = listSubBrand;
      this.categoryLevelSingles = listCategoryFilter;
      this.listBrands = this.handleSortBrand(listCategoryFilter.brand);
      this.subCategories = listCategoryFilter.sub_categories;
      this.isHasCombo = listCategoryFilter.has_combo == 1 ? true : false;
      let arrProperty = listCategoryFilter.property;
      this.breadcrumb = [
        { text: "Trang chủ", link: "" },
        {
          text: this.categoryLevelSingles.name,
          link: this.categoryLevelSingles.slug,
          active: true
        }
      ];
      this.handleBindingQueryUrl(this.$route.query);
      this.handleAmountData();
      this.filter();
      this.isLoading = false;
    },
    handleBindingQueryUrl(query) {
      if (query) {
        const {
          brand,
          firstproperty,
          subcategoryid,
          subbrandid,
          listproperty,
          sorttype,
          sortfield,
          currenpage,
          iscombo,
          vendors,
          amount
        } = query;
        this.isSubBrand = true;
        //bind data from url brand
        this.brandId = brand != undefined ? parseInt(brand) : 0;
        if (this.brandId != 0) {
          this.brandTextActive = this.listBrands.find(
            e => e.id == this.brandId
          ).name;
        }
        //bind data from url first property
        this.firstId = firstproperty ? firstproperty : "all";
        if (this.firstId != "all") {
          this.firstTextActive = this.objFirstProperty.value.find(
            e => e.name == this.firstId
          ).name;
        }
        this.subCategoryId =
          subcategoryid != undefined ? parseInt(subcategoryid) : 0;
        if (this.subCategoryId != 0) {
          this.subCategoryTextActive = this.subCategories.find(
            e => e.id == this.subCategoryId
          ).name;
        }
        this.subBrandId = subbrandid != undefined ? parseInt(subbrandid) : 0;
        if (this.brandId != 0 && this.firstId != "all") {
          this.listItemSubBrands = this.listSubBrand[this.brandId][
            this.firstId
          ];
          if (this.subBrandId != 0 && this.listItemSubBrands.length > 0) {
            this.subBrandTextActive = this.listItemSubBrands.find(
              e => e.id == this.subBrandId
            ).name;
          }
        }

        if (listproperty) {
          this.listProperty = JSON.parse(listproperty);
          for (const [index, i] of Object.keys(this.listProperty).entries()) {
            let result = arrProperty
              .find(e => e.id == i)
              .value.find(p => p.id == Object.values(this.listProperty)[index]);
            if (result) {
              this.propertyTextActive[i] = result.name;
            } else {
              this.propertyTextActive[i] = "Tất cả";
            }
          }
          if (Object.values(this.listProperty)[0]) {
            for (const [index, i] of Object.keys(this.listProperty).entries()) {
              this.tagFilterProperty.push({
                id: parseInt(i),
                value: arrProperty
                  .find(e => e.id == i)
                  .value.find(
                    p => p.id == Object.values(this.listProperty)[index]
                  ).name
              });
            }
          }
        }
        if (sorttype && sortfield) {
          let result = this.optionSort.find(
            e => e.value == sorttype && e.type == sortfield
          );
          this.sort.sortType = result ? result.value : "desc";
          this.sort.sortText = result ? result.text : "Giá tăng dần";
          this.sort.sortField = result ? result.type : "discount";
        }
        if (currenpage) {
          this.pagination.currenPage = parseInt(currenpage);
        }
        if (iscombo) {
          this.isCombo = parseInt(iscombo);
        }
        if (vendors) {
          this.selectedVendor = JSON.parse(vendors);
        }
        if (amount) {
          this.amountString = amount;
          this.amountTextActive =
            this.amountString != "all" ? this.amountString : "Tất cả";
        } else {
          this.amountString = "all";
        }
      }
    },
    async getSubBrand(categoryId) {
      let response = await ProductService.getSubBrand(
        this.$axios,
        categoryId
      ).catch(e => console.log(e));
      this.objSubBrand = response.data;
      this.isLoadingCategory = false;
    },
    filter() {
      this.isLoadingCategory = true;
      this.isLoadingProductMobile = true;
      let firstId = {};
      let arrFirst = [];
      if (this.amountString != "all") {
        this.tagFilterAmount = [
          {
            id:
              this.objAmountFilter.amount_property_id != 0
                ? this.objAmountFilter.amount_property_id
                : undefined,
            value: this.amountString
          }
        ];
      } else {
        this.tagFilterAmount = [];
      }
      if (this.firstId != "all") {
        firstId = this.objFirstProperty.value.find(e => e.name == this.firstId);
        arrFirst = [{ id: this.objFirstProperty.id, value: firstId.name }];
      } else {
        arrFirst = [];
      }
      this.arrFilters = [
        ...arrFirst,
        ...this.tagFilterProperty,
        ...this.tagFilterAmount
      ];
      let query = {
        brand: this.brandId,
        iscombo: this.isCombo,
        subcategoryid: this.subCategoryId,
        subbrandid: this.subBrandId,
        issubbrand: this.isSubBrand,
        listproperty: this.listProperty
          ? JSON.stringify(this.listProperty)
          : undefined,
        vendors:
          this.selectedVendor.length > 0
            ? JSON.stringify(this.selectedVendor)
            : undefined,
        amount: this.amountString != "all" ? this.amountString : undefined,
        firstproperty: this.firstId != "all" ? firstId.name : undefined,
        sortfield: this.sort.sortField,
        sorttype: this.sort.sortType,
        currenpage: this.pagination.currenPage
      };

      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        ProductService.postProductFilter(
          this.$axios,
          this.categoryId,
          this.brandId != 0 ? this.brandId : undefined,
          this.isCombo,
          this.subCategoryId != 0 ? this.subCategoryId : undefined,
          this.subBrandId != 0 ? this.subBrandId : undefined,
          this.arrFilters,
          this.selectedVendor,
          this.sort.sortField,
          this.sort.sortType,
          this.pagination.currenPage,
          this.$device.isDesktop
            ? (this.pagination.pageSize = 40)
            : (this.pagination.pageSize = 20)
        ).then(resp => {
          this.productFilters = resp.data.data.products;
          this.totalPage = resp.data.data.total;
          this.vendorFilters = resp.data.data.vendors;
          this.isLoadingCategory = false;
          this.isLoadingProductMobile = false;
        });
        this.$router.push({ path: this.$route.path, query: { ...query } });
      }, 1000);
    }
  },
  layout: "default"
};
</script>
<style lang="scss" scoped>
.btnSearchReverse {
  border: solid 1px #00a896;
  background-color: #ffffff;
  color: #00a896;
  padding: 0.45rem 1rem;
  &:hover,
  &:focus,
  &:active {
    background-color: #f2f2f2 !important;
    box-shadow: none !important;
    outline: none;
    color: #00a896 !important;
  }
}

.btnSearch {
  border: solid 1px #00a896;
  background-color: #00a896;
  color: #ffffff;
  padding: 0.45rem 1rem;
  &:hover,
  &:focus,
  &:active {
    background-color: #008073 !important;
    box-shadow: none !important;
    outline: none;
  }
}
.removeAll {
  display: inline-block;
  text-decoration: underline !important;
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
}
.btnMoreRead {
  text-transform: uppercase;
  color: #999999;
  font-size: 13px;
  &:focus {
    border-color: transparent !important;
    box-shadow: none !important;
  }
}
.tag {
  margin-top: 0.45rem;
  margin-bottom: 0.45rem;
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background-color: #e8e8e8;
  .remove {
    position: relative;
    display: inline-block;
    width: 12px;
    height: 17px;
    overflow: hidden;
    &::before,
    &::after {
      content: "";
      position: absolute;
      height: 2px;
      width: 100%;
      top: 50%;
      left: 0;
      margin-top: 2px;
      background: #333;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
}
.boxCategoryBgColorActive {
  background-color: #ff599a !important;
  border-color: #ff599a;
}

.boxFiterLoading {
  pointer-events: none;
}

.boxFilterRightSelect {
  width: 210px;
  height: 40px;
  border: 1px solid #707070;
  &:focus {
    box-shadow: none;
  }

  &.custom-select {
    font-size: 0.9375rem;
    background: #fff url("../../assets/img/icon/arrowBottom.svg") no-repeat
      right 0.75rem center/10px 15px !important;
  }
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 48px;
  height: 48px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 30px;
  height: 30px;
  margin: 6px;
  border: 4px solid #cb0055;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #cb0055 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 576px) {
  .boxCategoryFilter {
    .col-custom {
      flex: 0 0 45%;
      max-width: 45%;
    }
  }
  .btnSearchReverse {
    font-size: 0.875rem;
  }
  .btnSearch {
    font-size: 0.875rem;
  }
}
</style>
