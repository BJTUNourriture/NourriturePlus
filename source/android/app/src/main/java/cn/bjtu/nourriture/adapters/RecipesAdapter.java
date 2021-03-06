package cn.bjtu.nourriture.adapters;

import android.app.Activity;
import android.app.ActivityOptions;
import android.content.Intent;
import android.graphics.Color;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import cn.bjtu.nourriture.R;
import cn.bjtu.nourriture.api.NourritureService;
import cn.bjtu.nourriture.api.ServiceFactory;
import cn.bjtu.nourriture.model.Recipe;
import cn.bjtu.nourriture.pages.RecipePageActivity;
import rx.Observable;
import rx.Subscriber;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

public class RecipesAdapter extends RecyclerView.Adapter<RecipesAdapter.ViewHolder> implements Filterable {

    private final LayoutInflater mLayoutInflater;
    private final Activity mActivity;
    private List<Recipe> mRecipes = new ArrayList<>();
    private List<Recipe> mfilteredRecipes = new ArrayList<>();

    private static final String TAG = "Recipe";

    private OnItemClickListener mOnItemClickListener;

    public interface OnItemClickListener {
        void onClick(View view, int position);
    }

    public RecipesAdapter(Activity activity) {
        mActivity = activity;
        mLayoutInflater = LayoutInflater.from(activity.getApplicationContext());
        updateRecipes(activity);
    }

    private void updateRecipes(Activity activity) {
        //Insantiate the non-singleton Nourriture Service
        NourritureService service = ServiceFactory.createRetrofitService(NourritureService.class);

        //Get all the recipes from the API
        Observable<List<Recipe>> observable = service.getRecipes();

        observable
                .subscribeOn(Schedulers.newThread())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Subscriber<List<Recipe>>() {
                    @Override
                    public void onCompleted() {
                        //Do nothing
                    }

                    @Override
                    public void onError(Throwable e) {
                        //Log.e(TAG, e.getMessage());
                                /*e.printStackTrace();
                                Log.e(TAG, e.getMessage());*/
                                /*if (e instanceof HttpException) {
                                    ErrorLogin error = ErrorUtils.parseError(((HttpException) e).response().errorBody(), ServiceGenerator.getRetrofit());
                                }*/
                    }

                    @Override
                    public void onNext(List<Recipe> recipe) {
                        mActivity.findViewById(R.id.empty_view).setVisibility(View.GONE);
                        for (int i = 0; i < recipe.size(); i++) {
                            Log.d(TAG, recipe.get(i).getName());
                            // TODO : need to handle data from fragment !!!

                            recipe.get(i).setColorItem(new ColorItem());
                            mRecipes.add(recipe.get(i));
                            mfilteredRecipes.add(recipe.get(i));

                            //notifyItemChanged(recipe.get(i).get_id());
                        }
                        notifyDataSetChanged();
                    }
                });
        // get dummy recipes
//
//        mRecipes.add(new Recipe("MACARONIS", "000001", new ColorItem("#84ffff", "#ffffff","#03a9f4")));
//        mRecipes.add(new Recipe("CHOUX FLEURS", "000002", new ColorItem("#b9f6ca", "#000000","#1de9b6")));
//        mRecipes.add(new Recipe("RAVIOLIS", "000003", new ColorItem("#b388ff", "#ffffff","#7e57c2")));
//        mRecipes.add(new Recipe("TRIPES FARCIES AUX ECHALOTTES", "000004", new ColorItem("#ff8a80", "#ffffff","#ff5252")));
//        mRecipes.add(new Recipe("TRIPES FARCIES AUX ECHALOTTES", "000004", new ColorItem("#ff8a80", "#ffffff","#ff5252")));
//        mRecipes.add(new Recipe("TRIPES FARCIES AUX ECHALOTTES", "000004", new ColorItem("#ff8a80", "#ffffff","#ff5252")));
//
//
//        // TODO : need to handle data from fragment !!!
//        mfilteredRecipes.add(new Recipe("MACARONIS", "000001", new ColorItem("#84ffff", "#ffffff","#03a9f4")));
//        mfilteredRecipes.add(new Recipe("CHOUX FLEURS", "000002", new ColorItem("#b9f6ca", "#000000","#1de9b6")));
//        mfilteredRecipes.add(new Recipe("RAVIOLIS", "000003", new ColorItem("#b388ff", "#ffffff","#7e57c2")));
//        mfilteredRecipes.add(new Recipe("TRIPES FARCIES AUX ECHALOTTES", "000004", new ColorItem("#ff8a80", "#ffffff","#ff5252")));
//        mfilteredRecipes.add(new Recipe("TRIPES FARCIES AUX ECHALOTTES", "000004", new ColorItem("#ff8a80", "#ffffff","#ff5252")));
//        mfilteredRecipes.add(new Recipe("TRIPES FARCIES AUX ECHALOTTES", "000004", new ColorItem("#ff8a80", "#ffffff","#ff5252")));


    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return new ViewHolder(mLayoutInflater
                .inflate(R.layout.item_recipe, parent, false));
    }


    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        Recipe recipe = mRecipes.get(position);
//        setCategoryIcon(recipe, holder.icon);
//        holder.itemView.setBackgroundColor(getColor(theme.getWindowBackgroundColor()));


        holder.icon.setImageResource(R.drawable.food);
        holder.itemView.setBackgroundColor(Color.parseColor(recipe.getColor().getBackgroundColor()));
        holder.title.setText(recipe.getName());
        holder.title.setTextColor(Color.parseColor(recipe.getColor().getTextColor()));
        holder.title.setBackgroundColor(Color.parseColor(recipe.getColor().getPrimaryColor()));

//        holder.title.setTextColor(getColor(theme.getTextPrimaryColor()));
//        holder.title.setBackgroundColor(getColor(theme.getPrimaryColor()));
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mOnItemClickListener.onClick(v, position);
                Log.d(TAG, "ALLAHU AKBAR " + position);

//                FragmentTransaction ft = ((FragmentActivity) mActivity).getSupportFragmentManager().beginTransaction();
//                ft.replace(R.id.frame, RecipePageActivity.newInstance(mRecipes.get(position)));
//                ft.commit();


                holder.title.setTransitionName("title");
                ActivityOptions options = ActivityOptions.makeSceneTransitionAnimation(mActivity, holder.title, "title");
                Intent intent = new Intent(mActivity, RecipePageActivity.class);
                intent.putExtra(RecipePageActivity.NAME, mRecipes.get(position));
                mActivity.startActivity(intent, options.toBundle());


//                Intent intent = new Intent(mActivity, RecipePageActivity.class);
//                intent.putExtra(RecipePageActivity.NAME, mRecipes.get(position));
//                mActivity.startActivity(intent, ActivityOptions.makeSceneTransitionAnimation(mActivity).toBundle());
            }
        });
    }


    @Override
    public long getItemId(int position) {
        return mRecipes.get(position).get_id().hashCode();
    }

    @Override
    public int getItemCount() {
        return mRecipes.size();
    }

    public Recipe getItem(int position) {
        return mRecipes.get(position);
    }

    public final void notifyItemChanged(String id) {
        notifyItemChanged(getItemPositionById(id));
    }

    private int getItemPositionById(String id) {
        for (int i = 0; i < mRecipes.size(); i++) {
            if (mRecipes.get(i).get_id().equals(id)) {
                return i;
            }

        }
        return -1;
    }

    public void setOnItemClickListener(OnItemClickListener onItemClickListener) {
        mOnItemClickListener = onItemClickListener;
    }


    static class ViewHolder extends RecyclerView.ViewHolder {

        final ImageView icon;
        final TextView title;

        public ViewHolder(View container) {
            super(container);
            icon = (ImageView) container.findViewById(R.id.recipe_icon);
            title = (TextView) container.findViewById(R.id.recipe_title);
        }
    }

    @Override
    public Filter getFilter() {
        return new RecipeFilter(this, mfilteredRecipes);
    }

    private static class RecipeFilter extends Filter {

        private final RecipesAdapter adapter;

        private final List<Recipe> originalList;
        private final List<Recipe> filteredList;

        private RecipeFilter(RecipesAdapter adapter, List<Recipe> originalList) {
            super();
            this.adapter = adapter;
            this.originalList = new LinkedList<>(originalList);
            this.filteredList = new ArrayList<>();
        }

        @Override
        protected FilterResults performFiltering(CharSequence constraint) {
            filteredList.clear();
            final FilterResults results = new FilterResults();

            if (constraint.length() == 0) {
                filteredList.addAll(originalList);
            } else {
                final String filterPattern = constraint.toString().toLowerCase().trim();

                for (final Recipe recipes : originalList) {
                    if (recipes.getName().toLowerCase().contains(constraint.toString().toLowerCase())) {
                        filteredList.add(recipes);
                    }
                }
            }
            results.values = filteredList;
            results.count = filteredList.size();
            return results;
        }

        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) {
            adapter.mRecipes.clear();
            adapter.mRecipes.addAll((ArrayList<Recipe>) results.values);
            adapter.notifyDataSetChanged();
        }
    }
}
